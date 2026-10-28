import type { Appearance } from "@/lib/types";

const generations: Appearance["generation"][] = ["20s", "30s", "40s", "50s", "60s", "70s"];
const widths: Appearance["width"][] = ["narrow", "medium", "broad"];

export function appearanceFromSlug(slug: string): Appearance {
  let hash = 0;
  for (const char of slug) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return {
    tone: (hash % 4) as Appearance["tone"],
    generation: generations[hash % generations.length],
    presentation: hash % 2 === 0 ? "a" : "b",
    width: widths[(hash >> 3) % widths.length],
  };
}
