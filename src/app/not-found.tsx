"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import siteConfig from "@/config/site";

export default function NotFound() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.2), transparent 65%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, rgba(212,165,116,0.25), transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[600px] px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="text-[8rem] sm:text-[10rem] font-bold text-gradient opacity-30 leading-none block">
              404
            </span>
          </motion.div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Page Not Found
          </h1>

          <div className="section-divider mb-6" />

          <p className="text-[15px] text-white/30 leading-relaxed mb-10 max-w-[420px] mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="btn-premium group flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 rounded-full text-sm font-semibold text-white"
            >
              <Home className="h-4 w-4" />
              Back to Home
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>

            <Link
              href="/projects"
              className="btn-glass group flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold text-white/70"
            >
              View Projects
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <a
              href={siteConfig.links.tel}
              className="flex items-center gap-2 text-[13px] text-white/20 hover:text-primary transition-colors duration-300"
            >
              <Phone className="h-3.5 w-3.5" />
              {siteConfig.contact.phone}
            </a>
            <a
              href={siteConfig.links.wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[13px] text-white/20 hover:text-[#25D366] transition-colors duration-300"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
