const en = {
  meta: {
    languageName: "English",
  },
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    guide: "HMDA & DTCP Guide",
    projects: "Projects",
    builders: "Builders",
    whyHyderabad: "Why Hyderabad",
    nri: "NRI Investment",
    insights: "Insights",
    testimonials: "Testimonials",
    scheduleVisit: "Schedule Site Visit",
    contact: "Contact",
    allProjects: "All Projects",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  language: {
    selectorLabel: "Language",
    chooseLanguage: "Choose language",
    current: "Current language",
  },
  cta: {
    freeConsultation: "Free Consultation",
    bookFreeConsultation: "Book Free Consultation",
    exploreProjects: "Explore Projects",
    getStarted: "Get Started",
    talkToArjun: "Talk to Arjun",
    viewProjects: "View Projects",
    backToHome: "Back to Home",
    startJourney: "Start Your Journey Today",
    scheduleCall: "Schedule a Call",
    viewAllBuilders: "View All Builders",
    whatsapp: "WhatsApp",
    call: "Call",
  },
  common: {
    readMore: "Read more",
    learnMore: "Learn more",
    viewDetails: "View details",
    submit: "Submit",
    sending: "Sending…",
    loading: "Loading…",
    home: "Home",
    step: "STEP",
    by: "By",
    published: "Published",
    updated: "Updated",
    relatedArticles: "Related Articles",
    faqs: "Frequently Asked Questions",
    backToInsights: "Back to Insights",
    getInTouch: "Get in touch",
  },
  footer: {
    quickLinks: "Quick Links",
    contactDetails: "Contact Details",
    brandDescription:
      "Independent real estate advisory helping investors find verified HMDA, DTCP and RERA approved properties across Hyderabad.",
    copyright: (year: number) => `© ${year} Arjun Realty Premium Advisory. All rights reserved.`,
  },
  forms: {
    name: "Name",
    fullName: "Full Name",
    phone: "Phone",
    phoneNumber: "Phone Number",
    email: "Email",
    emailAddress: "Email Address",
    message: "Message",
    subject: "Subject",
    budget: "Budget",
    preferredLocation: "Preferred Location",
    required: "This field is required",
    invalidPhone: "Please enter a valid phone number",
    invalidEmail: "Please enter a valid email address",
    success: "Thank you. We will contact you shortly.",
    error: "Something went wrong. Please try again.",
  },
  notFound: {
    title: "Page Not Found",
    description:
      "The page you are looking for doesn't exist or has been moved. Let's get you back on track.",
  },
} as const;

export default en;

export type Dictionary = {
  meta: { languageName: string };
  nav: Record<keyof typeof en.nav, string>;
  language: Record<keyof typeof en.language, string>;
  cta: Record<keyof typeof en.cta, string>;
  common: Record<keyof typeof en.common, string>;
  footer: {
    quickLinks: string;
    contactDetails: string;
    brandDescription: string;
    copyright: (year: number) => string;
  };
  forms: Record<keyof typeof en.forms, string>;
  notFound: Record<keyof typeof en.notFound, string>;
};
