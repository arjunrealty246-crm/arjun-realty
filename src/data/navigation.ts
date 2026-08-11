export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "All Projects", href: "/projects" },
      { label: "Compare Projects", href: "/projects/compare" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  { label: "Builders", href: "/builders" },
  { label: "About Us", href: "/about" },
  { label: "Why Hyderabad", href: "/why-hyderabad" },
  { label: "NRI Investment", href: "/nri-investment" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const footerQuickLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Builders", href: "/builders" },
  { label: "Why Hyderabad", href: "/why-hyderabad" },
  { label: "NRI Investment", href: "/nri-investment" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const footerServices: { label: string; href: string }[] = [
  { label: "Property Advisory", href: "/" },
  { label: "NRI Investment", href: "/nri-investment" },
  { label: "Legal Verification", href: "/" },
  { label: "Project Portfolio", href: "/portfolio" },
  { label: "Schedule Site Visit", href: "/schedule-site-visit" },
  { label: "Compare Projects", href: "/projects/compare" },
];

export const locationMarquee = [
  "Shamshabad", "Kollur", "Financial District", "Srisailam Highway",
  "Nanakramguda", "Gachibowli", "HITEC City", "Kokapet", "Narsingi",
  "Mokila", "Bachupally", "Tellapur",
];

export const trustMarquee = [
  { text: "HMDA Approved Plots" },
  { text: "DTCP Approved Layouts" },
  { text: "RERA Registered Projects" },
  { text: "100% Clear Titles" },
  { text: "Zero Brokerage" },
  { text: "Verified Projects" },
  { text: "NRI-Friendly Investment" },
  { text: "Free Consultation" },
];

export const headerCta = {
  label: "Free Consultation",
  href: "/contact",
};

export const officeHours = {
  weekdays: "Monday – Friday: 9:00 AM – 6:00 PM",
  saturday: "Saturday: 9:00 AM – 2:00 PM",
};
