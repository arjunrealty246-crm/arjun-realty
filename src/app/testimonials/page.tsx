"use client";

import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import ContactSection from "@/components/ContactSection";
import { Star, Quote, Info } from "lucide-react";
import siteConfig from "@/config/site";

const testimonials = [
  { name: "Suresh Babu", role: "Software Engineer, Hyderabad", location: "Kukatpally", rating: 5, text: "I was looking for a gated community plot close to the IT corridor but within a reasonable budget. The team at Arjun Realty walked me through multiple options with complete legal details and approval documents. The transparency throughout the process gave me the confidence to go ahead.", sample: true },
  { name: "Meera Joshi", role: "NRI Investor, Abu Dhabi", location: "Investor", rating: 5, text: "Being based overseas, I needed someone I could trust to handle everything on the ground. Arjun Realty arranged virtual tours, shared all documentation digitally, and coordinated the entire registration process. The NRI desk was professional and responsive at every step.", sample: true },
  { name: "Ravi Teja", role: "Business Owner, Warangal", location: "Investor", rating: 5, text: "What impressed me was the thoroughness of the legal verification before any recommendation was made. Every project they presented had clear title documentation and government approvals. That level of due diligence is rare in this industry.", sample: true },
  { name: "Kavitha Reddy", role: "Homemaker, Secunderabad", location: "Homebuyer", rating: 5, text: "My husband and I visited three different projects before making our decision. The Arjun Realty team never rushed us and gave honest comparisons between locations, amenities, and long-term potential. We felt well-informed before committing.", sample: true },
  { name: "Farhan Ahmad", role: "NRI Investor, Singapore", location: "Investor", rating: 5, text: "I invested in two separate projects through Arjun Realty \u2014 one in the Shamshabad corridor and one along Srisailam Highway. The team provided regular updates on development progress and infrastructure changes in both areas.", sample: true },
  { name: "Prasad Rao", role: "Retired Government Officer, Vijayawada", location: "Investor", rating: 5, text: "At this stage of life, I needed a low-risk investment with clear documentation. Arjun Realty showed me options that matched my budget and risk profile without any pressure. Their approach was patient, professional, and refreshingly honest.", sample: true },
  { name: "Ananya Iyer", role: "Doctor, Kondapur", location: "Homebuyer", rating: 5, text: "The site visit experience was excellent. We were shown the actual infrastructure \u2014 roads, drainage, water supply \u2014 not just promises on paper. Seeing the development in person made our decision much easier. The team was knowledgeable and answered every question.", sample: true },
];

export default function TestimonialsPage() {
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
              { "@type": "ListItem", position: 2, name: "Testimonials", item: `${siteConfig.url}/testimonials` },
            ],
          }),
        }}
      />
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

      <section className="pb-4 lg:pb-6">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
            <Info className="h-4 w-4 text-white/30 shrink-0 mt-0.5" />
            <p className="text-[12px] text-white/30 leading-relaxed">
              The testimonials below are AI-generated sample content created for illustration purposes. They do not represent verified customer reviews or genuine client experiences. Real customer testimonials will be added as authentic feedback is collected.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-7 h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="h-6 w-6 text-primary/15" />
                    <span className="text-[9px] uppercase tracking-wider text-white/20 border border-white/[0.06] rounded-full px-2 py-0.5">Sample</span>
                  </div>
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary/70 text-primary/70" />
                    ))}
                  </div>
                  <p className="text-[13px] text-white/45 leading-[1.75] flex-1 mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.04]">
                    <div className="h-10 w-10 rounded-full shrink-0 flex items-center justify-center text-[11px] font-bold text-primary/70" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(212,165,116,0.08))" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/85">{t.name}</p>
                      <p className="text-[11px] text-white/25">{[t.role, t.location].filter(Boolean).join(" \u00b7 ")}</p>
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
