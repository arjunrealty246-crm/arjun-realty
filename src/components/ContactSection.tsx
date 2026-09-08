"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import SectionLabel from "./SectionLabel";
import siteConfig from "@/config/site";
import { contactSection } from "@/data/content";
import { submitLead } from "@/lib/lead-client";
import { trackEvent } from "@/lib/analytics";

const budgetRanges = contactSection.budgetLabels;
const countries = contactSection.countries;

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", whatsapp: "", country: "India", budget: "", email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    void submitLead({
      name: form.name,
      mobile: form.phone,
      whatsapp: form.whatsapp || undefined,
      email: form.email || undefined,
      country: form.country || undefined,
      investmentBudget: form.budget || undefined,
      source: "Contact Form",
      leadType: "Investment Enquiry",
    });

    const msg = encodeURIComponent(
      `Hi Arjun Realty, I'm interested in investing.\n\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}${form.whatsapp ? `\nWhatsApp: ${form.whatsapp}` : ""}${form.email ? `\nEmail: ${form.email}` : ""}\n` +
      `Country: ${form.country}${form.budget ? `\nBudget: ${form.budget}` : ""}`
    );
    trackEvent("enquiry_submit", { event_category: "lead_generation", content_label: "Contact Form" });
    window.open(`${siteConfig.links.wa}?text=${msg}`, "_blank");
    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <section className="relative pt-28 pb-44 md:py-28 lg:py-36 overflow-hidden" id="contact">
      <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.03] left-1/4 -top-48" />

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal className="text-center mb-16 lg:mb-20">
          <SectionLabel>{contactSection.label}</SectionLabel>
          <h2 className="mt-5 text-[clamp(1.8rem,4vw,3.2rem)] font-bold tracking-[-0.02em] leading-tight">
            Start Your <span className="text-gradient">Investment</span> Journey
          </h2>
          <p className="mt-4 text-white/35 max-w-lg mx-auto text-[0.9rem] leading-relaxed">
            {contactSection.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
          {/* Form */}
          <ScrollReveal className="lg:col-span-3" direction="left">
            <div className="glass-card rounded-[1.5rem] p-6 sm:p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{contactSection.successTitle}</h3>
                  <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                    {contactSection.successMessage}
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", whatsapp: "", country: "India", budget: "", email: "" }); }}
                    className="mt-6 text-[13px] text-primary hover:text-primary-light transition-colors font-medium">
                    {contactSection.resetButton || "Submit Another Inquiry"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cs-name" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.name}</label>
                      <input id="cs-name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
                        placeholder={contactSection.formPlaceholders.name} className="input-luxury" />
                    </div>
                    <div>
                      <label htmlFor="cs-phone" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.phone}</label>
                      <input id="cs-phone" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)}
                        placeholder={contactSection.formPlaceholders.phone} className="input-luxury" pattern="[\+]?[0-9\s\-\(\)]{10,15}" title="Please enter a valid phone number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cs-whatsapp" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.whatsapp}</label>
                      <input id="cs-whatsapp" type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)}
                        placeholder={contactSection.formPlaceholders.whatsapp} className="input-luxury" pattern="[\+]?[0-9\s\-\(\)]{10,15}" title="Please enter a valid phone number" />
                    </div>
                    <div>
                      <label htmlFor="cs-email" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.email}</label>
                      <input id="cs-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                        placeholder={contactSection.formPlaceholders.email} className="input-luxury" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cs-country" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.country || "Country"}</label>
                      <select id="cs-country" value={form.country} onChange={(e) => update("country", e.target.value)} className="select-luxury">
                        {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="cs-budget" className="block text-[11px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-2.5">{contactSection.formLabels.budget}</label>
                      <select id="cs-budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} className="select-luxury">
                        <option value="">{contactSection.budgetPlaceholder || "Select your budget"}</option>
                        {budgetRanges.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }} type="submit" disabled={submitting}
                    className="btn-premium w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-full text-[13px] font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.15)] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    <Send className="h-4 w-4" />
                    {contactSection.submitButton}
                  </motion.button>
                  <p className="text-[11px] text-white/20 text-center">
                    {contactSection.privacy}
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Sidebar */}
          <ScrollReveal className="lg:col-span-2 space-y-5" direction="right">
            {/* Contact Details */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">Contact Details</h3>
              <div className="space-y-4">
                  {[
                    { icon: Phone, label: siteConfig.contact.phone, sub: siteConfig.address.hours, href: siteConfig.links.tel },
                    { icon: Mail, label: siteConfig.contact.email, sub: "We reply within 24 hours", href: siteConfig.links.mailto },
                    { icon: MapPin, label: siteConfig.address.short, sub: `${siteConfig.address.state} ${siteConfig.address.pincode}`, href: null },
                  ].map((item) =>
                    item.href ? (
                      <a key={item.label} href={item.href} onClick={() => {
                        if (item.href === siteConfig.links.tel) {
                          trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Contact Details" });
                        } else if (item.href === siteConfig.links.mailto) {
                          trackEvent("cta_click", { event_category: "lead_generation", content_label: "Email - Contact Details" });
                        }
                      }} className="flex items-start gap-3.5 group">
                        <div className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/15 transition-all duration-300">
                          <item.icon className="h-4 w-4 text-primary/70" />
                        </div>
                        <div>
                          <p className="text-[13px] text-white/70 group-hover:text-primary transition-colors font-medium">{item.label}</p>
                          <p className="text-[11px] text-white/25">{item.sub}</p>
                        </div>
                      </a>
                    ) : (
                      <div key={item.label} className="flex items-start gap-3.5 group cursor-default">
                        <div className="h-9 w-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                          <item.icon className="h-4 w-4 text-primary/70" />
                        </div>
                        <div>
                          <p className="text-[13px] text-white/70 font-medium">{item.label}</p>
                          <p className="text-[11px] text-white/25">{item.sub}</p>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Office Hours */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">Office Hours</h3>
              <div className="space-y-2.5">
                {[
                  { day: "Monday – Saturday", time: "9:00 AM – 7:00 PM" },
                  { day: "Sunday", time: "By Appointment Only" },
                  { day: "Public Holidays", time: "Closed" },
                ].map((r) => (
                  <div key={r.day} className="flex items-center justify-between text-[13px]">
                    <span className="text-white/35 flex items-center gap-2"><Clock className="h-3 w-3 text-primary/40" />{r.day}</span>
                    <span className="text-white/55 font-medium">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Connect */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4">Quick Connect</h3>
              <div className="flex gap-3">
                <a href={siteConfig.links.wa} target="_blank" rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("cta_click", { event_category: "lead_generation", content_label: "WhatsApp - Quick Connect" })
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366]/[0.08] border border-[#25D366]/15 text-[#25D366] text-[12px] font-semibold hover:bg-[#25D366]/15 transition-all duration-300">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  WhatsApp
                </a>
                <a href={siteConfig.links.tel}
                  onClick={() =>
                    trackEvent("call_click", { event_category: "lead_generation", content_label: "Call - Quick Connect" })
                  }
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/[0.08] border border-primary/15 text-primary text-[12px] font-semibold hover:bg-primary/15 transition-all duration-300">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>
              <a href="/schedule-site-visit"
                onClick={() =>
                  trackEvent("site_visit", { event_category: "lead_generation", content_label: "Site Visit - Contact" })
                }
                className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/[0.06] text-white/40 text-[11px] font-medium hover:text-primary hover:border-primary/20 transition-all duration-300">
                Schedule a Site Visit
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
