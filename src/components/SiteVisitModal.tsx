"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarCheck, User, Phone, Mail, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import siteConfig from "@/config/site";
import { siteVisitForm } from "@/data/content";
import { submitLead } from "@/lib/lead-client";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export default function SiteVisitModal({ isOpen, onClose, projectName }: SiteVisitModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", message: "" });
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
      email: form.email || undefined,
      project: projectName || undefined,
      preferredDate: form.date || undefined,
      message: form.message || undefined,
      source: "Site Visit",
      leadType: "Site Visit",
    });

    const text = encodeURIComponent(
      `Site Visit Request\n\n` +
      `Project: ${projectName || "General Inquiry"}\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n` +
      `Preferred Date: ${form.date || "Flexible"}\n` +
      `Message: ${form.message || "N/A"}`
    );

    setTimeout(() => {
      setStatus("done");
      setTimeout(() => {
        window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
        setForm({ name: "", phone: "", email: "", date: "", message: "" });
        setStatus("idle");
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-3xl p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 h-8 w-8 rounded-full glass flex items-center justify-center text-white/30 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">{siteVisitForm.heading}</h2>
              <p className="text-sm text-white/30 mt-1">
                {projectName ? `Schedule a visit to ${projectName}` : siteVisitForm.description}
              </p>
            </div>

            {status === "done" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12"
              >
                <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-white font-semibold text-lg">{siteVisitForm.successTitle}</p>
                <p className="text-white/30 text-sm mt-1">{siteVisitForm.successMessage}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider font-medium mb-2">
                    <User className="h-3 w-3" /> {siteVisitForm.nameLabel}
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder={siteVisitForm.namePlaceholder}
                    className="input-luxury"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider font-medium mb-2">
                        <Phone className="h-3 w-3" /> {siteVisitForm.phoneLabel}
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder={siteVisitForm.phonePlaceholder}
                        className="input-luxury"
                        pattern="[\+]?[0-9\s\-\(\)]{10,15}"
                        title="Please enter a valid phone number"
                      />
                  </div>
                  <div>
                      <label className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider font-medium mb-2">
                        <Mail className="h-3 w-3" /> {siteVisitForm.emailLabel}
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={siteVisitForm.emailPlaceholder}
                        className="input-luxury"
                      />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider font-medium mb-2">
                    <CalendarCheck className="h-3 w-3" /> {siteVisitForm.dateLabel}
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    className="input-luxury"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs text-white/30 uppercase tracking-wider font-medium mb-2">
                    <MessageSquare className="h-3 w-3" /> {siteVisitForm.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder={siteVisitForm.messagePlaceholder}
                    className="input-luxury resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-premium w-full bg-gradient-to-r from-primary to-primary-dark py-3.5 rounded-full text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="h-4 w-4" />
                      {siteVisitForm.submitButton}
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-white/15 mt-2">
                  {siteVisitForm.privacy}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
