"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { pageLoader } from "@/data/content";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1600);
    const t4 = setTimeout(() => setLoading(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a14]"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ delay: 0.2, duration: 1.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.15), transparent 65%)" }}
            />
          </div>

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo mark — cinematic reveal */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -inset-5 rounded-[1.5rem] border border-primary/10"
              />
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-7 rounded-[1.6rem]"
                style={{ border: "1px solid transparent", borderTopColor: "rgba(249,115,22,0.2)", borderRightColor: "rgba(249,115,22,0.08)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner logo */}
              <div className="h-16 w-16 rounded-[1.1rem] bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.3)] relative">
                <span className="text-white font-bold text-2xl tracking-tight">A</span>
                {/* Shimmer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 rounded-[1.1rem] overflow-hidden"
                >
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              </div>
              {/* Pulse ring */}
              <motion.div
                className="absolute -inset-2 rounded-[1.2rem] border border-primary/20"
                animate={{ scale: [1, 1.3, 1.3], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>

            {/* Brand name — sequential reveal */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12px] uppercase tracking-[0.45em] text-white/30 font-medium"
              >
                {pageLoader.brandName}
              </motion.div>

              {/* Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] uppercase tracking-[0.3em] text-white/15 font-medium"
              >
                {pageLoader.tagline}
              </motion.div>

              {/* Loading bar — dual layer */}
              <div className="relative w-32 h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={phase >= 2 ? { x: "100%" } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={phase >= 2 ? { x: "120%" } : {}}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-gold/30 to-transparent"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
