"use client";

import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ContactSection from "@/components/ContactSection";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Reddy", role: "IT Professional, Hyderabad", rating: 5, text: "Arjun Realty made the entire investment process seamless. From site visits to documentation, everything was handled professionally. My plot near Kollur has already appreciated 30% in 18 months.", image: "" },
  { name: "Priya Nair", role: "NRI Investor, Dubai", rating: 5, text: "As an NRI, investing in Indian real estate felt overwhelming until I found Arjun Realty. K. Nagarjuna's team handled everything remotely — virtual tours, legal verification, registration. Highly recommended.", image: "" },
  { name: "Vikram Singh", role: "Business Owner, Delhi", rating: 5, text: "I've invested in multiple projects through Arjun Realty. Their due diligence is top-notch — every project is genuinely verified and approved. The returns have consistently exceeded my expectations.", image: "" },
  { name: "Anitha Sharma", role: "Doctor, Secunderabad", rating: 5, text: "What sets Arjun Realty apart is their transparency. No hidden charges, no false promises. They guided me to a gated community plot near Financial District that has been a fantastic investment.", image: "" },
  { name: "Mohammed Farhan", role: "NRI Investor, Singapore", rating: 5, text: "I purchased two plots through Arjun Realty — one near Shamshabad and one near Srisailam Highway. Both are performing beyond my expectations. Their NRI desk is excellent.", image: "" },
  { name: "Deepak Verma", role: "Entrepreneur, Mumbai", rating: 5, text: "After comparing multiple advisors, Arjun Realty stood out for their genuine market knowledge and honest approach. My investment in the Financial District corridor has been one of my best decisions.", image: "" },
  { name: "Lakshmi Iyer", role: "NRI Investor, USA", rating: 5, text: "K. Nagarjuna personally guided me through the entire process. The legal verification was thorough, and the project recommendations were spot-on. I've since recommended them to three friends.", image: "" },
  { name: "Arvind Kumar", role: "Retired Officer, Warangal", rating: 5, text: "At my age, I was cautious about investing. Arjun Realty's patience and professionalism put me at ease. They showed me multiple options and helped me choose what was right for my retirement goals.", image: "" },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Testimonials</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Trusted by <span className="text-gradient">1000+ Investors</span> Worldwide
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-xl">
              Don&apos;t just take our word for it. Here&apos;s what our
              investors say about the Arjun Realty experience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-7 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <Quote className="h-6 w-6 text-primary/15 mb-4" />
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary/70 text-primary/70" />
                    ))}
                  </div>
                  <p className="text-[13px] text-white/45 leading-[1.75] flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.04]">
                    <div className="h-10 w-10 rounded-full bg-cover bg-center border border-white/10 shrink-0 flex items-center justify-center text-[11px] font-bold text-primary/70" style={{ backgroundImage: t.image ? `url(${t.image})` : undefined, background: t.image ? undefined : "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(212,165,116,0.08))" }}>
                      {!t.image && t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/85">{t.name}</p>
                      <p className="text-[11px] text-white/25">{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
