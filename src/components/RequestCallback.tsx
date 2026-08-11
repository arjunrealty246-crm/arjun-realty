"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import siteConfig from "@/config/site";
import { requestCallback } from "@/data/content";
import { submitLead } from "@/lib/lead-client";

interface RequestCallbackProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestCallback({ isOpen, onClose }: RequestCallbackProps) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    void submitLead({
      name: form.name,
      mobile: form.phone,
      message: form.message || undefined,
      source: "Callback",
      leadType: "Callback Request",
    });

    const text = encodeURIComponent(
      `Callback Request\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Message: ${form.message || "N/A"}`
    );

    setTimeout(() => {
      window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
      setStatus("done");
      setForm({ name: "", phone: "", message: "" });
      setTimeout(() => { setStatus("idle"); onClose(); }, 1800);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] glass-card-elevated rounded-[1.5rem] p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className="text-center py-8">
                <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-7 w-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{requestCallback.successTitle}</h3>
                <p className="text-sm text-white/40">{requestCallback.successMessage}</p>
              </div>
            ) : (
              <>
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{requestCallback.heading}</h3>
                <p className="text-sm text-white/30 mb-6">{requestCallback.description}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">{requestCallback.nameLabel}</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder={requestCallback.namePlaceholder}
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">{requestCallback.phoneLabel}</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder={requestCallback.phonePlaceholder}
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">{requestCallback.messageLabel}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-white/20" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={2}
                        placeholder={requestCallback.messagePlaceholder}
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-premium w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-6 py-3.5 rounded-xl text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Phone className="h-4 w-4" />
                    )}
                    {status === "submitting" ? "Sending..." : requestCallback.submitButton}
                  </button>
                </form>

                <p className="text-[10px] text-white/15 text-center mt-4">{requestCallback.privacy}</p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
