import Link from "next/link";
import { Fragment } from "react";
import { Home } from "lucide-react";
import siteConfig from "@/config/site";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
  showNav?: boolean;
}

export default function PageBreadcrumbs({ items, showNav = false }: PageBreadcrumbsProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${siteConfig.url}${item.url}`,
      })),
    ],
  };

  return (
    <>
      {showNav && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1 text-white/40 hover:text-primary/60 transition-colors duration-300"
          >
            <Home className="h-3 w-3" /> Home
          </Link>
          {items.map((item, i) => (
            <Fragment key={`${item.url}-${i}`}>
              <span className="text-white/20">/</span>
              {i === items.length - 1 ? (
                <span className="text-white/60 truncate max-w-[220px]">{item.name}</span>
              ) : (
                <Link href={item.url} className="text-white/40 hover:text-primary/60 transition-colors duration-300">
                  {item.name}
                </Link>
              )}
            </Fragment>
          ))}
        </nav>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
