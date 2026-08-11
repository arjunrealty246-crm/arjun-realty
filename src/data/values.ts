export interface ValueItem {
  icon: string;
  title: string;
  desc: string;
  accent: string;
}

export interface TrustIndicator {
  title: string;
  desc: string;
}

export const reasons: ValueItem[] = [
  { icon: "Shield", title: "Transparency", desc: "We believe in complete transparency — no hidden charges, no misleading promises, every detail shared upfront.", accent: "from-emerald-500/20 to-emerald-500/5" },
  { icon: "Handshake", title: "Trust", desc: "Built on years of honest dealings, our reputation is our most valuable asset. Every recommendation earns trust.", accent: "from-gold/20 to-gold/5" },
  { icon: "Users", title: "Customer First", desc: "Your goals drive every decision we make. We take time to understand your needs and tailor solutions accordingly.", accent: "from-blue-500/20 to-blue-500/5" },
  { icon: "Building2", title: "Verified Projects", desc: "Every project is legally vetted — HMDA, DTCP and RERA approved with clear titles and zero encumbrances.", accent: "from-primary/20 to-primary/5" },
  { icon: "TrendingUp", title: "Long-Term Relationships", desc: "We stay with you beyond the purchase. From documentation to post-investment support, we are always a call away.", accent: "from-violet-500/20 to-violet-500/5" },
  { icon: "HeadphonesIcon", title: "Professional Guidance", desc: "Led by experienced advisors, we provide data-backed insights and expert guidance at every step of your journey.", accent: "from-rose-500/20 to-rose-500/5" },
];

export const trustIndicators: TrustIndicator[] = [
  { title: "Verified Projects", desc: "Every project we showcase is legally vetted — HMDA, DTCP and RERA approved with clear titles and zero encumbrances." },
  { title: "Honest Advice", desc: "We provide unbiased recommendations based on your needs, not commission. Our advisory is independent and transparent." },
  { title: "Transparent Process", desc: "From first consultation to final registration, every step is documented and communicated. No hidden charges, ever." },
  { title: "1000+ Happy Families", desc: "Trusted by investors across India, Dubai, USA, UK, Singapore, and Canada. 4.9/5 Google rating." },
  { title: "Multi-Builder Access", desc: "Projects from 4+ reputed builders. Unbiased recommendations because we represent multiple developers, not just one." },
  { title: "End-to-End Support", desc: "From site visits and legal verification to financing and registration — we stay with you until you take possession." },
];

export const aboutValues: ValueItem[] = [
  { icon: "Shield", title: "Transparency", desc: "We believe in complete transparency — no hidden charges, no misleading promises, every detail shared upfront.", accent: "from-emerald-500/20 to-emerald-500/5" },
  { icon: "Handshake", title: "Trust", desc: "Built on years of honest dealings, our reputation is our most valuable asset. Every recommendation earns trust.", accent: "from-gold/20 to-gold/5" },
  { icon: "Users", title: "Customer First", desc: "Your goals drive every decision we make. We take time to understand your needs and tailor solutions accordingly.", accent: "from-blue-500/20 to-blue-500/5" },
  { icon: "Building2", title: "Verified Projects", desc: "Every project we recommend is legally vetted — HMDA, DTCP and RERA approved with clear titles.", accent: "from-primary/20 to-primary/5" },
];
