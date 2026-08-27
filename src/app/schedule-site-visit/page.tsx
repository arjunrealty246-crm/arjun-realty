"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, User, Phone, Mail, MessageSquare, MapPin, ArrowRight, Loader2, CheckCircle, Clock, Home } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import { projects } from "@/data/projects";
import siteConfig from "@/config/site";
import { submitLead } from "@/lib/lead-client";

export default function ScheduleVisitPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    date: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const projectName = form.project
      ? projects.find((p) => p.slug === form.project)?.name || form.project
      : "General Inquiry";

    void submitLead({
      name: form.name,
      mobile: form.phone,
      email: form.email || undefined,
      project: projectName === "General Inquiry" ? undefined : projectName,
      preferredDate: form.date || undefined,
      preferredTime: form.time || undefined,
      message: form.message || undefined,
      source: "Site Visit",
      leadType: "Site Visit",
    });

    const text = encodeURIComponent(
      `Site Visit Request\n\n` +
      `Project: ${projectName}\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      `Email: ${form.email || "N/A"}\n` +
      `Preferred Date: ${form.date || "Not specified"}\n` +
      `Time: ${form.time || "Not specified"}\n` +
      `Message: ${form.message || "N/A"}`
    );

    setTimeout(() => {
      window.open(`${siteConfig.links.wa}?text=${text}`, "_blank");
      setStatus("done");
      setForm({ name: "", phone: "", email: "", project: "", date: "", time: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 400);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Schedule Site Visit", item: `${siteConfig.url}/schedule-site-visit` },
            ],
          }),
        }}
      />
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.04] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Site Visit</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Schedule a <span className="text-gradient">Free Site Visit</span>
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Experience the projects firsthand. We arrange complimentary site visits with transportation
              across all locations. Typically arranged within 24 hours.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 lg:px-12">
          <h2 className="sr-only">Visit Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { icon: Clock, label: "Fast Response", desc: "We confirm your visit within 2 hours" },
              { icon: MapPin, label: "Free Pickup & Drop", desc: "Complimentary transportation from anywhere in Hyderabad" },
              { icon: Home, label: "All Projects", desc: "Visit any project across all our partner builders" },
              { icon: MessageSquare, label: "Expert Guide", desc: "Accompanied by a senior advisor for all your questions" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.label} delay={i * 0.06}>
                  <div className="glass-card rounded-2xl p-5 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-white">{item.label}</h3>
                      <p className="text-[11px] text-white/30">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="glass-card-elevated rounded-[1.5rem] p-8 sm:p-10">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <CalendarCheck className="h-6 w-6 text-primary" />
              </div>

              {status === "done" ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Visit Request Sent!</h3>
                  <p className="text-white/40">Our team will confirm your visit shortly via WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          type="text" name="name" value={form.name} onChange={handleChange} required
                          placeholder="e.g. Ravi Sharma"
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          type="tel" name="phone" value={form.phone} onChange={handleChange} required
                          placeholder="+91 96423 33246"
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Email (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          type="email" name="email" value={form.email} onChange={handleChange}
                          placeholder="arjunrealty246@gmail.com"
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Select Project</label>
                      <div className="relative">
                        <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <select
                          name="project" value={form.project} onChange={handleChange}
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="">All Projects (General Visit)</option>
                          {projects.map((p) => (
                            <option key={p.slug} value={p.slug}>{p.name} — {p.location.split(",")[0]}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Preferred Date</label>
                      <div className="relative">
                        <CalendarCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <input
                          type="date" name="date" value={form.date} onChange={handleChange}
                          min={today}
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300 [color-scheme:dark]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
                        <select
                          name="time" value={form.time} onChange={handleChange}
                          className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="">Any time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="12:00 PM">12:00 PM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-white/30 font-medium mb-1.5 uppercase tracking-wider">Additional Notes (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-white/20" />
                      <textarea
                        name="message" value={form.message} onChange={handleChange} rows={2}
                        placeholder="Any specific requirements or questions..."
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/15 focus:outline-none focus:border-primary/30 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-premium w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark px-8 py-4 rounded-xl text-[14px] font-semibold text-white glow-primary-strong disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <CalendarCheck className="h-5 w-5" />
                    )}
                    {status === "submitting" ? "Scheduling..." : "Schedule My Free Site Visit"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              <p className="text-[10px] text-white/15 text-center mt-5">
                We respect your privacy. Your details are safe with us and will only be used to arrange your site visit.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
