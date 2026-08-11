"use client";

import { useState } from "react";

interface HeroVideoBackgroundProps {
  heroVideo?: string;
  image: string;
}

export default function HeroVideoBackground({ heroVideo, image }: HeroVideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);

  const videoSrc = heroVideo;

  if (!videoSrc || !videoSrc.endsWith(".mp4") || videoError) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
    );
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={() => setVideoError(true)}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
