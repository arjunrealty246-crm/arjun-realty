import { Shield, FileText, Landmark, Map, CheckCircle2, ArrowRight, Phone, MessageCircle, Building2, Ruler, Zap, Moon, Droplets, CheckCheck } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import siteConfig from "@/config/site";
import { seo } from "@/data/seo";

const route = "/guides/telangana-plot-buyer-checklist";
const pageUrl = `${siteConfig.url}${route}`;
const PAGE_TITLE = "The Ultimate Plot Buyer Verification Guide in Telangana (HMDA, DTCP, FCDA & RERA)";

const waConsult = `${siteConfig.links.wa}?text=${encodeURIComponent(
  "Hi Arjun Realty, I would like a free land due diligence consultation before buying a plot in Hyderabad."
)}`;

const steps = [
  {
    icon: Shield,
    step: "01",
    title: "Legal Title Clearance",
    desc: "Verify the complete chain of registered sale deeds from the original owner to the current seller. Ensure mutation records and 7/12 extracts are consistent, survey numbers match the layout plan, and there are no pending disputes, stay orders or family partition claims on the land.",
  },
  {
    icon: FileText,
    step: "02",
    title: "30-Year Encumbrance Certificate (EC)",
    desc: "Obtain an Encumbrance Certificate covering at least the last 30 years from the Sub-Registrar of the district. Every registered transaction, mortgage, gift, or charge appears on the EC. A clean 30-year EC confirms there are no undisclosed financial liabilities attached to the land.",
  },
  {
    icon: Landmark,
    step: "03",
    title: "Link Documents",
    desc: "Every sale deed in the title chain must be 'linked' — each document should reference the previous one, with identical survey numbers, boundaries, extents and names. Any gap or mismatch in the link documents is a red flag that must be resolved before you pay any amount.",
  },
  {
    icon: Map,
    step: "04",
    title: "Dharani Portal Survey Number Checks",
    desc: "Cross-verify the survey and patta numbers on the Telangana Dharani portal (bhoomi.telangana.gov.in). Confirm the khata is in the seller's name, the land classification permits residential layout use, and there are no pending tax dues, prior assignments or double registrations.",
  },
  {
    icon: Building2,
    step: "05",
    title: "Master Plan Zoning",
    desc: "Check the parcel against the local Master Plan / Zonal Development Plan land-use map. The plot must fall under Residential (or approved layout) zoning — not Conservation, Green, Water Body, agricultural special zone or earmarked road-widening reservations that would block construction or registration later.",
  },
];

const approvals = [
  {
    key: "HMDA",
    name: "HMDA — Hyderabad Metropolitan Development Authority",
    tag: "Approved Layouts in the Hyderabad Metropolitan Region",
    perks: [
      "Recognized by banks for home and plot loans",
      "Regularized streets, drains and open spaces as per norms",
      "High resale liquidity and straightforward registration",
      "Ideal for ORR-adjacent and core-ring growth corridors",
    ],
  },
  {
    key: "DTCP",
    name: "DTCP — Directorate of Town & Country Planning",
    tag: "Municipal-area Approved Layouts & Open Plots",
    perks: [
      "Mainstream approval for Telangana's growth-corridor open plots",
      "Structured grid of roads, drainage and layout drawings",
      "Bank financing available for approved plot purchases",
      "Clear future-proofing for construction and resale",
    ],
  },
  {
    key: "FCDA",
    name: "FCDA — Future City Development Authority",
    tag: "Approvals along the Future City Growth Corridor",
    perks: [
      "Master-planned approval near Future City, AI City & the airport zone",
      "Specified infrastructure and utilities within the corridor",
      "Early-mover appreciation as the corridor develops",
      "Backed by strong demand from tech-driven growth",
    ],
  },
];

const reraPoints = [
  "RERA registration binds the developer to the sanctioned layout, completion timelines and promised infrastructure — so your investment is contractually protected.",
  "The project's sanctioned plan and details are published on the Telangana RERA portal, making it easy to verify legal authenticity before you buy.",
  "RERA protects buyers against unapproved changes, delayed deliverables and misleading marketing, with a real statutory recourse in case of default.",
  "Homes and plots in RERA-registered gated layouts face fewer frictions during bank loans, resale and future construction approvals.",
];

const infra = [
  "100% underground drainage and water-supply network",
  "Dedicated MEP infrastructure with fully underground cabling",
  "Wide BT (black-top) roads of 33, 40 and 60 feet",
  "Avenue plantation and landscaped open spaces",
  "Compound wall with grand entrance arch",
  "LED street lighting and power backup provisions",
  "24×7 security with CCTV surveillance",
  "Clear titles, approvals and bank-loan facility",
];

const faqs = [
  {
    q: "What documents should I check before buying a plot in Hyderabad?",
    a: "Verify the chain of sale deeds, a minimum 30-year Encumbrance Certificate, linked documents, the Dharani survey/patta status, the layout approval (HMDA, DTCP, FCDA or RERA) and the Master Plan zoning of the parcel.",
  },
  {
    q: "Why is a 30-year Encumbrance Certificate important for plot buyers?",
    a: "The EC records every registered transaction, mortgage or charge on a property. A clean 30-year EC assures you the land is free from undisclosed loans, liens and encumbrances before you invest.",
  },
  {
    q: "What is the difference between HMDA, DTCP and FCDA approvals?",
    a: "HMDA approves layouts in the Hyderabad Metropolitan Region, DTCP regulates municipal and town-planning layouts across Telangana, and FCDA (Future City Development Authority) approves layouts along the Future City growth corridor — each signals legally recognized, bankable and resale-friendly land.",
  },
  {
    q: "Why is RERA registration essential for gated layouts?",
    a: "RERA registration legally binds the developer to the sanctioned plan, timelines and promised infrastructure. It gives homebuyers statutory protection, published project details and legal recourse — safeguarding your investment end to end.",
  },
  {
    q: "What infrastructure should a good plot layout have?",
    a: "Look for 100% underground drainage, dedicated MEP cabling, wide 33/40/60 ft BT roads, avenue plantation, compound wall, entrance arch, street lighting, security, and bank-loan facilities with clear titles and valid approvals.",
  },
  {
    q: "How do I verify a plot on the Dharani portal?",
    a: "Visit bhoomi.telangana.gov.in and check the survey/patta number, the khata owner's name, the land classification and any prior registrations. Confirm the record matches the developer's documents before proceeding.",
  },
];

export default function PlotBuyerGuidePage() {
  return (
    <>
      <PageBreadcrumbs items={[{ name: "Plot Buyer Verification Guide", url: route }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: PAGE_TITLE,
            description: seo["plot-buyer-guide"].description,
            datePublished: "2026-08-27",
            dateModified: "2026-08-27",
            mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
            image: `${siteConfig.url}/og-image.png`,
            author: { "@type": "Person", name: siteConfig.founder.name, url: `${siteConfig.url}/about` },
            publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, logo: { "@type": "ImageObject", url: `${siteConfig.url}/og-image.png` } },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Buyer&apos;s Guide</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,3.6rem)] font-bold tracking-[-0.03em] leading-[1.08]">
              The Ultimate Plot Buyer <span className="text-gradient">Verification Guide</span> in Telangana (HMDA, DTCP, FCDA &amp; RERA)
            </h1>
            <p className="mt-6 text-white/40 text-base sm:text-lg leading-relaxed max-w-2xl">
              A step-by-step checklist to verify land titles, approvals and infrastructure before you buy a plot in Hyderabad —
              so your investment is safe, bankable and future-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={waConsult} target="_blank" rel="noreferrer" className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
                <MessageCircle className="h-4 w-4" /> Get Free Due Diligence Consultation
              </a>
              <a href="/projects" className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors">
                Explore Verified Projects <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-5 text-xs text-white/30">
              Free consultation · Call or WhatsApp {siteConfig.contact.phone} · Mon–Sat, 9 AM – 7 PM
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Core verification steps */}
      <section id="verification-steps" className="py-16 lg:py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-14">
            <SectionLabel>Step-by-Step</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              5 Core <span className="text-gradient">Verification Steps</span> Before You Buy
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              Every plot in Telangana must pass these five checks. Skipping even one can cost you months of legal trouble and a blocked investment.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 0.06} className={i === steps.length - 1 ? "md:col-span-2" : ""}>
                <div className="glass-card rounded-2xl p-7 relative overflow-hidden group h-full">
                  <span className="absolute top-4 right-5 text-[56px] font-bold text-white/[0.03] leading-none">{s.step}</span>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-500">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approvals breakdown */}
      <section id="approvals" className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-14">
            <SectionLabel>Know Your Approvals</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              HMDA vs DTCP vs FCDA — <span className="text-gradient">What Each Approval Means</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              A valid approval is your first line of defence. Here&apos;s how the three key Telangana layout approvals differ — and why each one matters for your resale and loan prospects.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {approvals.map((a, i) => (
              <ScrollReveal key={a.key} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCheck className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-[22px] font-bold text-gradient tracking-tight">{a.key}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 tracking-tight">{a.name}</h3>
                  <p className="text-xs text-primary/60 font-medium mb-4">{a.tag}</p>
                  <ul className="space-y-2.5 mt-auto">
                    {a.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-[13px] text-white/40 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RERA compliance */}
      <section id="rera" className="py-16 lg:py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <SectionLabel>RERA Compliance</SectionLabel>
              <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
                Why RERA Registration <span className="text-gradient">Protects Your Investment</span>
              </h2>
              <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
                For gated layouts and plotted developments, RERA (Real Estate Regulatory Authority) registration is the strongest statutory shield a buyer can have. It holds builders accountable to their committed plans and promises.
              </p>
              <div className="mt-6 space-y-4">
                {reraPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-[13px] text-white/40 leading-relaxed">
                    <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {point}
                  </div>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="glass-card-elevated rounded-2xl p-8">
                <h3 className="text-lg font-bold text-white mb-5">Quick RERA Check</h3>
                <ul className="space-y-4">
                  {faqs.slice(0, 3).map((f) => (
                    <li key={f.q} className="border-b border-white/[0.06] pb-4 last:border-0 last:pb-0">
                      <p className="text-[13px] font-semibold text-white/80 mb-1.5">{f.q}</p>
                      <p className="text-[12px] text-white/35 leading-relaxed">{f.a}</p>
                    </li>
                  ))}
                </ul>
                <a href={waConsult} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2.5 w-full justify-center bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
                  <MessageCircle className="h-4 w-4" /> Free Land Due Diligence Consultation
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Infrastructure checklist */}
      <section id="infrastructure" className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-14">
            <SectionLabel>Infrastructure</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              The Infrastructure <span className="text-gradient">Checklist</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              Good layouts are built for decades. Insist on underground utilities, wide black-top roads and planned amenities — not just pretty brochures.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {infra.map((item, i) => (
              <ScrollReveal key={item} delay={i * 0.04}>
                <div className="glass-card rounded-2xl p-5 flex items-start gap-3 h-full">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-[13px] text-white/45 leading-relaxed pt-1">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="mt-12">
            <div className="rounded-2xl p-8 border border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { icon: Droplets, label: "100% Underground" },
                { icon: Zap, label: "Dedicated MEP Cabling" },
                { icon: Ruler, label: "33 / 40 / 60 Ft BT Roads" },
                { icon: Moon, label: "Secure & Bankable" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-[13px] font-semibold text-white/70">{b.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured verified projects */}
      <section id="featured-projects" className="py-16 lg:py-20 bg-section-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl mb-14">
            <SectionLabel>Verified Projects</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.02em]">
              Approved Layouts, <span className="text-gradient">Built to This Checklist</span>
            </h2>
            <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
              Every project we recommend clears the verification steps above. Explore two of our featured approved developments:
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="glass-card-elevated rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  <CheckCircle2 className="h-4 w-4" /> FCDA Approved &middot; Advanced MEP Infrastructure
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">JB Harmony Woods</h3>
                <p className="mt-3 text-[13px] text-white/40 leading-relaxed">
                  A 53-acre FCDA-approved premium semi-villa community in the Future City growth corridor — with 100% underground cabling, dedicated ducting and 36,000 sq.ft. of lifestyle amenities.
                </p>
                <a href="/projects/jb-harmony-woods" className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-semibold text-primary hover:gap-3 transition-all">
                  Explore JB Harmony Woods <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="glass-card-elevated rounded-2xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
                  <CheckCircle2 className="h-4 w-4" /> DTCP &amp; RERA Approved &middot; 150-Acre Mega Venture
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">JB Pristine City</h3>
                <p className="mt-3 text-[13px] text-white/40 leading-relaxed">
                  A 150-acre mega master-planned DTCP &amp; RERA approved community in Vikarabad — the next high-growth destination of West Hyderabad, connected to the IT &amp; financial hubs of Kokapet, Gachibowli and Shankarpally.
                </p>
                <a href="/projects/jb-pristine-city" className="mt-auto inline-flex items-center gap-2 pt-6 text-[13px] font-semibold text-primary hover:gap-3 transition-all">
                  Explore JB Pristine City <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5">
          <ScrollReveal className="text-center mb-12">
            <SectionLabel>Buyer FAQ</SectionLabel>
            <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.5rem)] font-bold tracking-[-0.02em]">
              Common <span className="text-gradient">Plot Buyer Questions</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-[14px] font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-[13px] text-white/35 leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl p-10 lg:p-14 border border-primary/20 bg-gradient-to-br from-primary/[0.1] to-white/[0.02]">
              <div className="ambient-orb w-[500px] h-[500px] bg-primary/[0.07] -right-32 -top-32" />
              <div className="relative max-w-2xl">
                <SectionLabel>Free Advisory</SectionLabel>
                <h2 className="mt-6 text-[clamp(1.9rem,4vw,3rem)] font-bold tracking-[-0.03em] leading-[1.15]">
                  Get a Free <span className="text-gradient">Land Due Diligence Consultation</span>
                </h2>
                <p className="mt-5 text-white/40 text-sm sm:text-base leading-relaxed">
                  Our legal desk independently verifies titles, EC, Dharani status and approvals for the projects you shortlist. Completely free, no obligations.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={waConsult} target="_blank" rel="noreferrer" className="btn-premium inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-7 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
                    <MessageCircle className="h-4 w-4" /> WhatsApp {siteConfig.contact.phone}
                  </a>
                  <a href={siteConfig.links.tel} className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-[13px] font-semibold text-white/70 border border-white/10 hover:border-primary/50 transition-colors">
                    <Phone className="h-4 w-4" /> Call Now
                  </a>
                </div>
                <p className="mt-5 text-xs text-white/30">
                  Response within business hours · {siteConfig.contact.email}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}