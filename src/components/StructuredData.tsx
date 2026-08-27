import siteConfig from "@/config/site";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@id": `${siteConfig.url}/#organization`,
    "@type": "RealEstateAgent",
    additionalType: "https://schema.org/LocalBusiness",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description:
      "Hyderabad's trusted premium real estate advisory specializing in HMDA, DTCP, FCDA & RERA approved open plots, gated communities, and luxury apartments — with dedicated NRI investment support.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/og-image.png`,
    image: [
      `${siteConfig.url}/og-image.png`,
    ],
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
    priceRange: "₹35L – ₹5Cr+",
    currenciesAccepted: "INR",
    paymentAccepted: "Bank Transfer, UPI, Cheque",
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.full,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.31915,
      longitude: 78.64929,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.address.full)}`,
    sameAs: Object.values(siteConfig.social),
    knowsLanguage: ["en", "hi", "te"],
    knowsAbout: [
      "HMDA Approved Plots",
      "DTCP Approved Layouts",
      "RERA Registered Projects",
      "FCDA Approved Plots",
      "NRI Real Estate Investment",
      "Hyderabad Real Estate",
      "Open Plots Hyderabad",
      "Gated Communities Hyderabad",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "State", name: "Telangana" },
      { "@type": "Country", name: "India" },
    ],
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneRaw,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Telugu", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneRaw,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Telugu", "Hindi"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Advisory Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Property Advisory" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Legal Verification" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "NRI Real Estate Investment" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Site Visit Assistance" } },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@id": `${siteConfig.url}/#website`,
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const founderSchema = {
    "@context": "https://schema.org",
    "@id": `${siteConfig.url}/#founder`,
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    worksFor: { "@id": `${siteConfig.url}/#organization` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, websiteSchema, founderSchema]),
      }}
    />
  );
}