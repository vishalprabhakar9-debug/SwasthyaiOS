"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, House, UserRound, Activity, ChartNoAxesCombined } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/exercises", label: "Explore", icon: Compass },
  { href: "/routine", label: "Routine", icon: Activity },
  { href: "/progress", label: "Progress", icon: ChartNoAxesCombined },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/routine/play")) return null;
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper/95 backdrop-blur lg:hidden"
      aria-label="Primary mobile"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 text-sm ${active ? "text-forest" : "text-stone"}`}
              >
                <Icon className="size-5" aria-hidden="true" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
