"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
}

const offsets = {
  up: (d: number) => ({ y: d, x: 0 }),
  down: (d: number) => ({ y: -d, x: 0 }),
  left: (d: number) => ({ y: 0, x: d }),
  right: (d: number) => ({ y: 0, x: -d }),
  none: () => ({ y: 0, x: 0 }),
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.7,
  distance = 30,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const { x, y } = offsets[direction](distance);

  return (
    <motion.div
      initial={{ opacity: 0, y, x, filter: isMobile ? "blur(0px)" : "blur(2px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
