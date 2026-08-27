"use client";

import { useState, useEffect } from "react";

export function useDbProjectImages(): Record<string, string> {
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/data/projects")
      .then((r) => r.json())
      .then((data: { slug: string; image: string }[]) => {
        const map: Record<string, string> = {};
        for (const p of data) {
          if (p.image && p.slug) map[p.slug] = p.image;
        }
        setImages(map);
      })
      .catch(() => {});
  }, []);

  return images;
}
