import type { MetadataRoute } from "next";
import { brand } from "@/config/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${brand.name} — ${brand.subtitle}`,
    short_name: brand.name,
    description: "Traditional Indian bodyweight movement for modern adults.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#1f4d40",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
