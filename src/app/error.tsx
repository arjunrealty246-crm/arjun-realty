"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.2), transparent 65%)" }} />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, rgba(212,165,116,0.25), transparent 65%)" }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[600px] px-5 text-center">
        <div className="mb-8">
          <span className="text-[6rem] sm:text-[8rem] font-bold text-gradient opacity-20 leading-none block">
            Oops!
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
          Something Went Wrong
        </h1>

        <div className="section-divider mb-6" />

        <p className="text-[15px] text-white/30 leading-relaxed mb-10 max-w-[420px] mx-auto">
          An unexpected error occurred. Our team has been notified. Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="btn-premium group flex items-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="btn-glass group flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold text-white/70"
          >
            <Home className="h-4 w-4" />
            Back to Home
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
