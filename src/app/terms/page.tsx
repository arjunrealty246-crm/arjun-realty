import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import siteConfig from "@/config/site";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

export default function TermsPage() {
  return (
    <>
      <PageBreadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} />
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Legal</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p className="mt-4 text-white/40 text-sm">Last updated: July 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 space-y-8 text-[14px] text-white/40 leading-[1.8]">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-white mb-4">About Our Services</h2>
            <p>
              Arjun Realty is a real estate advisory firm based in Hyderabad, India. We provide
              investment consultation, property advisory, and related services for residential and
              commercial real estate.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-bold text-white mb-4">No Guarantee of Returns</h2>
            <p>
              While we strive to provide accurate market analysis and projections, real estate
              investments are subject to market risks. Past performance does not guarantee future
              results. All investment decisions are made at the client&apos;s own discretion.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-white mb-4">Advisory Nature</h2>
            <p>
              Our consultation services are advisory in nature. We do not act as a broker, agent,
              or financial advisor unless explicitly stated in a separate agreement. All property
              transactions are between the buyer and the developer/seller.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 className="text-xl font-bold text-white mb-4">Accuracy of Information</h2>
            <p>
              We make every effort to ensure that information on our website is accurate and
              up-to-date. However, project details, pricing, availability, and specifications are
              subject to change without notice. Clients are advised to verify all details independently.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
            <p>
              For questions regarding these terms, please contact us at{" "}
              <a href={siteConfig.links.mailto} className="text-primary hover:text-primary-light transition-colors">
                {siteConfig.contact.email}
              </a>{" "}
              or call{" "}
              <a href={siteConfig.links.tel} className="text-primary hover:text-primary-light transition-colors">
                {siteConfig.contact.phone}
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
