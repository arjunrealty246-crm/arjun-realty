"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#09090f]">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 65%)" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            className="absolute -inset-6 rounded-[1.4rem]"
            style={{ border: "1px solid transparent", borderTopColor: "rgba(249,115,22,0.15)", borderRightColor: "rgba(249,115,22,0.05)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <div className="h-14 w-14 rounded-[1rem] bg-gradient-to-br from-primary via-primary-dark to-primary flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.25)]">
            <span className="text-white font-bold text-xl tracking-tight">A</span>
          </div>
        </motion.div>

        <div className="relative w-24 h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          />
        </div>
      </div>
    </div>
  );
}
