"use client";

import { PDFDocument, PDFDict, PDFName, PDFStream, PDFRawStream, PDFArray } from "pdf-lib";
import { decode as jpegDecode, encode as jpegEncode } from "jpeg-js";

export class PdfCompressError extends Error {}

export interface OptimizePdfResult {
  file: File;
  originalSize: number;
  finalSize: number;
  optimized: boolean;
  reason?: string;
}

const MAX_IMAGE_DIM = 2000;
const JPEG_QUALITY = 0.68;
const MIN_GAIN_RATIO = 0.85; // require the result to be <=85% of the original before using it

function freshUint8(input: Uint8Array): Uint8Array {
  return new Uint8Array(input);
}

function getAsNumber(dict: PDFDict, key: PDFName): number | null {
  const v = dict.get(key);
  const num = v as unknown as { asNumber?: () => number } | null;
  if (num && typeof num.asNumber === "function") {
    return num.asNumber();
  }
  return null;
}

function bilinearResize(
  src: Uint8Array,
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number
): Uint8Array {
  const out = new Uint8Array(dstW * dstH * 4);
  const xRatio = srcW / dstW;
  const yRatio = srcH / dstH;
  for (let y = 0; y < dstH; y++) {
    const srcY = y * yRatio;
    const y0 = Math.floor(srcY);
    const y1 = Math.min(srcH - 1, y0 + 1);
    const fy = srcY - y0;
    for (let x = 0; x < dstW; x++) {
      const srcX = x * xRatio;
      const x0 = Math.floor(srcX);
      const x1 = Math.min(srcW - 1, x0 + 1);
      const fx = srcX - x0;
      const o = (y * dstW + x) * 4;
      for (let c = 0; c < 4; c++) {
        const i00 = (y0 * srcW + x0) * 4 + c;
        const i10 = (y0 * srcW + x1) * 4 + c;
        const i01 = (y1 * srcW + x0) * 4 + c;
        const i11 = (y1 * srcW + x1) * 4 + c;
        const top = src[i00] * (1 - fx) + src[i10] * fx;
        const bottom = src[i01] * (1 - fx) + src[i11] * fx;
        out[o] = Math.max(0, Math.min(255, Math.round(top * (1 - fy) + bottom * fy)));
      }
    }
  }
  return out;
}

/**
 * Re-encode a single embedded JPEG stream to a smaller JPEG (fresh Uint8Array whose
 * .buffer exactly matches, for pdf-lib's JpegEmbedder). Returns null when the image
 * cannot be decoded or when the re-encode is not meaningfully smaller.
 */
async function reencodeJpeg(
  rawBytes: Uint8Array,
  width: number,
  height: number
): Promise<{ bytes: Uint8Array; width: number; height: number } | null> {
  let rgba: Uint8Array;
  try {
    rgba = jpegDecode(freshUint8(rawBytes), { useTArray: true, maxMemoryUsageInMB: 512 }).data;
  } catch {
    return null;
  }

  let outW = width;
  let outH = height;
  let data = rgba;
  const maxDim = Math.max(width, height);
  if (maxDim > MAX_IMAGE_DIM) {
    const scale = MAX_IMAGE_DIM / maxDim;
    outW = Math.max(1, Math.round(width * scale));
    outH = Math.max(1, Math.round(height * scale));
    data = bilinearResize(rgba, width, height, outW, outH);
  }

  let newJpeg: Uint8Array;
  try {
    newJpeg = freshUint8(jpegEncode({ data, width: outW, height: outH }, JPEG_QUALITY).data);
  } catch {
    return null;
  }

  if (newJpeg.length >= rawBytes.length) return null;
  return { bytes: newJpeg, width: outW, height: outH };
}

interface SourceImage {
  name: PDFName;
  stream: PDFRawStream | PDFStream;
  width: number;
  height: number;
}

/** Collect the image XObjects referenced by a page's resources, or null if the page
 *  cannot be safely rebuilt (non-image resources present, Form XObjects, etc.). */
function collectRebuildImages(pageResources: PDFDict): SourceImage[] | null {
  // Non-image resource sub-dictionaries must be EMPTY (pdf-lib and simple scanned PDFs
  // leave /Font, /ExtGState, ... as empty dicts). If any is populated we cannot
  // faithfully reproduce the page -> abort. XObject must contain only Image streams.
  const nonImageKeys = [
    "Font",
    "ExtGState",
    "ColorSpace",
    "Pattern",
    "Shading",
    "Properties",
  ];
  for (const key of pageResources.keys()) {
    const name = key.asString().replace(/^\//, "");
    if (name === "XObject" || name === "ProcSet") continue;
    if (!nonImageKeys.includes(name)) return null;
    const sub = pageResources.lookupMaybe(key, PDFDict);
    if (sub && sub.keys().length > 0) return null;
  }

  const xobj = pageResources.lookupMaybe(PDFName.of("XObject"), PDFDict);
  if (!xobj) return null;

  const images: SourceImage[] = [];
  for (const key of xobj.keys()) {
    const stream = xobj.lookupMaybe(key, PDFStream);
    if (!stream) return null;
    const subtype = stream.dict.get(PDFName.of("Subtype"));
    if (!(subtype instanceof PDFName) || subtype.asString().replace(/^\//, "") !== "Image") return null; // Form XObject etc. -> abort
    const filter = getFirstFilter(stream);
    if (filter !== "DCTDecode" && filter !== "JPXDecode") return null; // only re-encode JPEGs
    const width = getAsNumber(stream.dict, PDFName.of("Width"));
    const height = getAsNumber(stream.dict, PDFName.of("Height"));
    if (!width || !height || width < 2 || height < 2) return null;
    images.push({ name: key, stream, width, height });
  }
  return images;
}

function getFirstFilter(stream: PDFRawStream | PDFStream): string | null {
  const filter = stream.dict.get(PDFName.of("Filter"));
  if (filter instanceof PDFName) return filter.asString().replace(/^\//, "");
  try {
    const arr = stream.dict.lookup(PDFName.of("Filter"), PDFArray as never) as unknown as {
      asArray: () => PDFName[];
    };
    const first = arr.asArray()[0];
    if (first instanceof PDFName) return first.asString().replace(/^\//, "");
  } catch {
    /* ignore */
  }
  return null;
}

/** Read a page's concatenated content stream bytes (single stream or array). */
function readPageContent(page: ReturnType<PDFDocument["getPage"]>): Uint8Array | null {
  const node = page.node;
  const contents = node.get(PDFName.of("Contents"));
  if (!contents) return new Uint8Array(0);

  if (contents instanceof PDFStream) {
    return contents.getContents();
  }
  try {
    const arr = node.lookup(PDFName.of("Contents")) as unknown as {
      asArray: () => unknown[];
      lookup: (index: number) => unknown;
    };
    const parts: Uint8Array[] = [];
    const raws = arr.asArray();
    for (let i = 0; i < raws.length; i++) {
      const item = arr.lookup(i);
      if (item instanceof PDFStream) parts.push(item.getContents());
    }
    if (parts.length === 0) return null;
    const total = parts.reduce((s, p) => s + p.length, 0);
    const joined = new Uint8Array(total);
    let off = 0;
    for (const p of parts) {
      joined.set(p, off);
      off += p.length;
    }
    return joined;
  } catch {
    return null;
  }
}

function readMediaBox(page: ReturnType<PDFDocument["getPage"]>): number[] | null {
  try {
    const mb = page.getMediaBox();
    return [mb.x, mb.y, mb.width, mb.height];
  } catch {
    return null;
  }
}

/**
 * Real browser-side PDF optimization that REBUILDS a fresh document so no orphaned
 * original-image objects survive (pdf-lib's in-place save() keeps them, which would
 * not reduce file size). Every page is reproduced verbatim via its original content
 * stream (preserving text/vector layout, all pages, correct order and PDF format)
 * while its JPEG images are re-encoded at reduced quality/dimension. Pages whose
 * resources contain beyond pure image-XObjects (fonts, forms, graphics states, etc.)
 * are NOT rebuilt — the original file is returned unchanged (or a clear error if it
 * still exceeds the target). The optimized output is never used unless it is genuinely
 * smaller and fits within targetBytes.
 */
export async function optimizePdfFile(
  file: File,
  targetBytes: number
): Promise<OptimizePdfResult> {
  const originalSize = file.size;
  const input = freshUint8(new Uint8Array(await file.arrayBuffer()));

  let src: PDFDocument;
  try {
    src = await PDFDocument.load(input, { ignoreEncryption: true, updateMetadata: false });
  } catch {
    throw new PdfCompressError(
      "Could not read the selected PDF. It may be corrupted, encrypted, or unsupported."
    );
  }
  if (src.isEncrypted) {
    throw new PdfCompressError(
      "This PDF is password-protected and cannot be optimized automatically. Please upload the original unprotected PDF."
    );
  }

  const pageCount = src.getPageCount();
  const out = await PDFDocument.create();

  let anyImageEncoded = false;
  for (let i = 0; i < pageCount; i++) {
    const srcPage = src.getPage(i);

    const mediaBox = readMediaBox(srcPage);
    const content = readPageContent(srcPage);
    if (!mediaBox || !content) {
      // Cannot rebuild this page safely -> abort to a no-op result.
      return { file, originalSize, finalSize: originalSize, optimized: false, reason: "unsupported-page-structure" };
    }

    const resources = srcPage.node.Resources();
    if (!resources) {
      return { file, originalSize, finalSize: originalSize, optimized: false, reason: "unsupported-page-structure" };
    }
    const images = collectRebuildImages(resources);
    if (images === null) {
      return { file, originalSize, finalSize: originalSize, optimized: false, reason: "unsupported-page-structure" };
    }

    const newPage = out.addPage([mediaBox[2], mediaBox[3]]);
    // Preserve non-zero origin and rotation where present.
    try {
      newPage.node.set(PDFName.of("MediaBox"), out.context.obj([mediaBox[0], mediaBox[1], mediaBox[0] + mediaBox[2], mediaBox[1] + mediaBox[3]]));
      const rotate = getAsNumber(srcPage.node, PDFName.of("Rotate"));
      if (rotate) newPage.node.set(PDFName.of("Rotate"), out.context.obj(rotate));
    } catch {
      /* keep defaults */
    }

    // Re-encode this page's images into the new document.
    const newXObject = out.context.obj({});
    let skippedAny = false;
    for (const img of images) {
      const raw = img.stream.getContents();
      if (!raw || raw.length < 32) {
        skippedAny = true;
        continue;
      }
      const re = await reencodeJpeg(raw, img.width, img.height);
      if (!re) {
        skippedAny = true;
        continue;
      }
      try {
        const newImg = await out.embedJpg(re.bytes);
        newXObject.set(img.name, newImg.ref);
        anyImageEncoded = true;
      } catch {
        skippedAny = true;
      }
    }

    // A page must keep all its images renderable; if any image could not be re-encoded
    // we cannot rebuild it faithfully -> abort to no-op (never emit a broken page).
    if (skippedAny) {
      return { file, originalSize, finalSize: originalSize, optimized: false, reason: "image-not-reencodable" };
    }

    const resourcesRef = out.context.register(
      out.context.obj({
        XObject: newXObject,
        ProcSet: out.context.obj([PDFName.of("PDF"), PDFName.of("ImageC"), PDFName.of("Text"), PDFName.of("ImageB"), PDFName.of("ImageI")]),
      })
    );
    const contentRef = out.context.register(out.context.flateStream(content));

    newPage.node.set(PDFName.of("Contents"), contentRef);
    newPage.node.set(PDFName.of("Resources"), resourcesRef);
  }

  if (!anyImageEncoded) {
    return { file, originalSize, finalSize: originalSize, optimized: false, reason: "no-images-reencoded" };
  }

  let outBytes: Uint8Array;
  try {
    outBytes = freshUint8(await out.save());
  } catch {
    return { file, originalSize, finalSize: originalSize, optimized: false, reason: "save-failed" };
  }
  const finalSize = outBytes.length;

  if (
    finalSize < originalSize &&
    finalSize <= targetBytes &&
    finalSize <= originalSize * MIN_GAIN_RATIO
  ) {
    const base = (file.name.replace(/\.[^.]+$/, "") || "brochure").replace(/[^a-zA-Z0-9._-]/g, "");
    const ab = outBytes.buffer.slice(
      outBytes.byteOffset,
      outBytes.byteOffset + outBytes.byteLength
    ) as ArrayBuffer;
    const optimizedFile = new File([ab], `${base}-optimized.pdf`, { type: "application/pdf" });
    return { file: optimizedFile, originalSize, finalSize, optimized: true };
  }

  return { file, originalSize, finalSize, optimized: false };
}
