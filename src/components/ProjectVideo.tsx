"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, X, Camera } from "lucide-react";

interface ProjectVideoProps {
  src: string;
  poster?: string;
  title: string;
}

const FALLBACK_GRADIENT = "from-primary/20 via-charcoal-dark to-primary/10";

export default function ProjectVideo({ src, poster, title }: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    const onEnd = () => { setPlaying(false); setProgress(0); };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    return () => { v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnd); };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (expanded) {
      const v = videoRef.current;
      if (v && document.fullscreenElement) document.exitFullscreen();
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };

  const handleVideoError = () => {
    setHasError(true);
    setPlaying(false);
  };

  if (hasError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden glass-card group"
      >
        <div className="relative aspect-video bg-charcoal-dark">
          {poster ? (
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover opacity-60"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMWExYTJlIiB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIvPjwvc3ZnPg=="
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${FALLBACK_GRADIENT}`} />
          )}
          <div className="absolute inset-0 bg-charcoal-dark/40 flex flex-col items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-white/[0.04] flex items-center justify-center mb-4">
              <Camera className="h-7 w-7 text-white/20" />
            </div>
            <p className="text-sm text-white/25 font-medium">Video Preview</p>
            <p className="text-xs text-white/15 mt-1">Walkthrough coming soon</p>
          </div>
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-[10px] font-semibold text-white/70 backdrop-blur-md">
              <Play className="h-2.5 w-2.5 fill-current" /> Project Walkthrough
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden glass-card group"
      >
        <div className="relative aspect-video bg-charcoal-dark">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted={muted}
            playsInline
            preload="metadata"
            onError={handleVideoError}
            className="w-full h-full object-cover"
          />

          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors duration-300"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:scale-110 transition-transform duration-300">
                <Play className="h-7 w-7 text-white ml-1" />
              </div>
            </button>
          )}

          {playing && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="text-white/80 hover:text-white transition-colors">
                  <Pause className="h-5 w-5" />
                </button>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
                <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <button onClick={toggleFullscreen} className="text-white/80 hover:text-white transition-colors">
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-[10px] font-semibold text-white/70 backdrop-blur-md">
              <Play className="h-2.5 w-2.5 fill-current" /> Project Walkthrough
            </span>
          </div>
        </div>
      </motion.div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setExpanded(false)}
        >
          <button className="absolute top-6 right-6 h-10 w-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            onError={handleVideoError}
            className="max-w-full max-h-[85vh] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}
