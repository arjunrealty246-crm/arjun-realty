import siteConfig from "@/config/site";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description:
      "Hyderabad's trusted premium real estate advisory specializing in HMDA, DTCP, FCDA & RERA approved open plots, gated communities, and luxury apartments.",
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.ico`,
    telephone: siteConfig.contact.phoneRaw,
    email: siteConfig.contact.email,
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
    sameAs: Object.values(siteConfig.social),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/projects?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organizationSchema, websiteSchema]),
      }}
    />
  );
}
