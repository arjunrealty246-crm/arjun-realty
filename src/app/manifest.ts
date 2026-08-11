import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arjun Realty — Premium Real Estate Advisory",
    short_name: "Arjun Realty",
    description:
      "Hyderabad's trusted premium real estate advisory. HMDA, DTCP, FCDA & RERA approved investments.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090f",
    theme_color: "#F97316",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
