"use client";

export class VideoCompressError extends Error {}

const MB = 1024 * 1024;
const HARD_LIMIT_BYTES = 100 * MB;
const ACCEPT_BYTES = 94 * MB; // accept once safely below 100 MB with headroom
const MAX_ATTEMPTS = 3;

const MP4_MIME_CANDIDATES = [
  "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
  "video/mp4;codecs=avc1.64001F,mp4a.40.2",
  "video/mp4",
];

function isMediaRecorderMp4Supported(): boolean {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") {
    return false;
  }
  return MP4_MIME_CANDIDATES.some((m) => MediaRecorder.isTypeSupported(m));
}

function pickMp4MimeType(): string {
  for (const m of MP4_MIME_CANDIDATES) {
    if (MediaRecorder.isTypeSupported(m)) return m;
  }
  return MP4_MIME_CANDIDATES[MP4_MIME_CANDIDATES.length - 1];
}

function formatMb(bytes: number): string {
  return `${(bytes / MB).toFixed(1)} MB`;
}

function loadVideoMetadata(file: File): Promise<{ video: HTMLVideoElement; url: string }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = url;
    video.onloadedmetadata = () => resolve({ video, url });
    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new VideoCompressError("Could not read the selected video. It may be corrupted or in an unsupported format."));
    };
  });
}

function readVideoDuration(video: HTMLVideoElement): number {
  return Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 0;
}

function seekToStart(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    const onSeek = () => {
      video.removeEventListener("seeked", onSeek);
      resolve();
    };
    video.addEventListener("seeked", onSeek, { once: true });
    try {
      video.currentTime = 0;
    } catch {
      resolve();
    }
  });
}

interface RecordResult {
  blob: Blob;
  mime: string;
}

// Re-encode the loaded source video to an MP4 blob at the given video bitrate.
// MediaRecorder must capture in near real-time from a playing <video> element.
function recordEncoded(video: HTMLVideoElement, mime: string, videoBitsPerSecond: number): Promise<RecordResult> {
  return new Promise((resolve, reject) => {
    let recorder: MediaRecorder | null = null;
    const chunks: BlobPart[] = [];
    let stopTimer: ReturnType<typeof setTimeout> | null = null;

    const capture = (
      video as HTMLVideoElement & { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream }
    ).captureStream || (video as HTMLVideoElement & { mozCaptureStream?: () => MediaStream }).mozCaptureStream;

    const finish = (ok: boolean, err?: Error) => {
      if (stopTimer) clearTimeout(stopTimer);
      if (!ok && recorder && recorder.state !== "inactive") {
        try { recorder.stop(); } catch { /* noop */ }
      }
      if (ok) resolve({ blob: new Blob(chunks, { type: mime }), mime });
      else reject(err || new VideoCompressError("Video compression failed."));
    };

    if (typeof capture !== "function") {
      return finish(false, new VideoCompressError("Your browser cannot capture the video stream for compression. Please compress the video to under 100 MB externally and upload it again."));
    }

    let stream: MediaStream | null = null;
    try {
      stream = capture.call(video);
    } catch {
      return finish(false, new VideoCompressError("Your browser cannot capture the video stream for compression. Please compress the video to under 100 MB externally and upload it again."));
    }
    if (!stream) {
      return finish(false, new VideoCompressError("Your browser cannot capture the video stream for compression. Please compress the video to under 100 MB externally and upload it again."));
    }

    try {
      recorder = new MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond,
      });
    } catch {
      return finish(false, new VideoCompressError("Your browser cannot record MP4 video for compression. Please compress the video to under 100 MB externally and upload it again."));
    }

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    recorder.onerror = () => finish(false, new VideoCompressError("Video compression failed mid-recording. Please try again."));
    recorder.onstop = () => finish(true);

    // Safety timeout so a stalled stream can't hang the UI forever.
    const timeoutMs = Math.max(120000, (readVideoDuration(video) || 60) * 1000 * 4);
    stopTimer = setTimeout(() => {
      if (recorder && recorder.state !== "inactive") {
        try { recorder.stop(); } catch { /* noop */ }
      }
    }, timeoutMs);

    recorder.start(1000); // collect 1s chunks so onstop has data
  });
}

/**
 * Compress a video File to an MP4 File safely below Cloudinary's 100 MB limit.
 * Only call this for files already known to be >= 100 MB. Returns a new File
 * with a .mp4 name and video/mp4 MIME type. Throws VideoCompressError with a
 * clear message if the browser cannot produce MP4 or the target size is
 * unreachable.
 */
export async function compressLargeVideo(file: File): Promise<File> {
  const base = (file.name.replace(/\.[^.]+$/, "") || "video").replace(/[^a-zA-Z0-9._-]/g, "");
  const outName = `${base}-compressed.mp4`;

  if (!isMediaRecorderMp4Supported()) {
    throw new VideoCompressError(
      "Your browser cannot compress video to MP4 in place. Please use an external tool (e.g. HandBrake) to reduce the video to under 100 MB, then upload it again."
    );
  }

  const { video, url } = await loadVideoMetadata(file);
  const duration = readVideoDuration(video);
  if (duration <= 0) {
    URL.revokeObjectURL(url);
    throw new VideoCompressError("Could not determine the video duration, so a safe bitrate could not be calculated.");
  }

  const mime = pickMp4MimeType();

  // Base bitrate targeting ~72 MB nominal (MediaRecorder overshoots vs. the
  // requested pin by roughly 1.1x), so output reliably lands ~80-90 MB and
  // well below the 100 MB Cloudinary limit.
  let targetBits = Math.max(100_000, Math.round((72 * MB * 8) / duration));

  let lastBlob: Blob | null = null;
  try {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      // Reset playback position for each attempt.
      await seekToStart(video);
      try { await video.play(); } catch { /* noop */ }

      const { blob } = await recordEncoded(video, mime, targetBits);
      try { video.pause(); } catch { /* noop */ }
      lastBlob = blob;

      if (blob.size < HARD_LIMIT_BYTES && blob.size < ACCEPT_BYTES) {
        break; // safely below limit with headroom
      }
      // Still too large -> lower bitrate meaningfully and retry.
      targetBits = Math.max(80_000, Math.round(targetBits * 0.65));
    }
  } finally {
    URL.revokeObjectURL(url);
  }

  if (!lastBlob || lastBlob.size >= HARD_LIMIT_BYTES) {
    throw new VideoCompressError(
      `Compression could not bring the video below the 100 MB limit (final: ${formatMb(lastBlob ? lastBlob.size : 0)}). Please compress it externally and upload again.`
    );
  }

  return new File([lastBlob], outName, { type: "video/mp4" });
}
