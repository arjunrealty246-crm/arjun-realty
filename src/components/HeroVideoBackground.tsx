"use client";

import { useState } from "react";
import Image from "next/image";

interface HeroVideoBackgroundProps {
  heroVideo?: string;
  image: string;
}

const RASTER = /\.(jpe?g|png|webp|avif|gif)$/i;

export default function HeroVideoBackground({ heroVideo, image }: HeroVideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false);

  const videoSrc = heroVideo;
  const showVideo = Boolean(videoSrc && videoSrc.endsWith(".mp4") && !videoError);
  const isRaster = RASTER.test(image.split("?")[0]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Static image layer — always present so the hero never flashes blank */}
      {isRaster ? (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-center"
          style={{ backgroundImage: `url(${image})`, backgroundPosition: "center 35%" }}
        />
      )}

      {/* Drone video layer — plays on top when available, otherwise image shows */}
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="metadata"
          poster={image}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] sm:object-center"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
