import ScrollReveal from "@/components/ScrollReveal";
import SectionLabel from "@/components/SectionLabel";
import siteConfig from "@/config/site";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";

export default function PrivacyPage() {
  return (
    <>
      <PageBreadcrumbs items={[{ name: "Privacy Policy", url: "/privacy" }]} />
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="ambient-orb w-[600px] h-[600px] bg-primary/[0.05] -right-48 -top-48" />
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <ScrollReveal className="max-w-3xl">
            <SectionLabel>Legal</SectionLabel>
            <h1 className="mt-6 text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.05]">
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="mt-4 text-white/40 text-sm">Last updated: July 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12 space-y-8 text-[14px] text-white/40 leading-[1.8]">
          <ScrollReveal>
            <h2 className="text-xl font-bold text-white mb-4">Information We Collect</h2>
            <p>
              When you submit an inquiry through our website, we collect your name, phone number,
              email address, and any additional information you provide. We also collect standard
              analytics data such as pages visited, time spent on the site, and referral source.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-bold text-white mb-4">How We Use Your Information</h2>
            <p>
              Your information is used solely to respond to your inquiries, provide investment
              advisory services, and improve our website experience. We do not sell, rent, or share
              your personal data with third parties for marketing purposes.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-white mb-4">Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <h2 className="text-xl font-bold text-white mb-4">Cookies</h2>
            <p>
              Our website uses essential cookies for functionality and analytics cookies to understand
              how visitors interact with our site. You can control cookie preferences through your
              browser settings.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              For any questions about this privacy policy, please contact us at{" "}
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
