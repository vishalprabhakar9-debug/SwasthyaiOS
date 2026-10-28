import Link from "next/link";
import { brand } from "@/config/brand";
import { siteDisclaimer } from "@/content/safety";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-paper">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-heading text-2xl text-forest">{brand.name}</p>
          <p className="mt-1 text-stone">{brand.subtitle}</p>
          <p className="mt-4 max-w-2xl">{siteDisclaimer}</p>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/safety" className="underline decoration-terracotta underline-offset-4">
            Safety and when to stop
          </Link>
          <Link href="/about" className="underline decoration-terracotta underline-offset-4">
            About and privacy
          </Link>
          <Link href="/profile" className="underline decoration-terracotta underline-offset-4">
            Text size, Easy View, and your data
          </Link>
          <p className="mt-3 text-stone">
            Working names kept in the brand notes: {brand.alternatives.join(", ")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
