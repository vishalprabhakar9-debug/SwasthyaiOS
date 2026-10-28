"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { brand } from "@/config/brand";
import { useProfile } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/exercises", label: "Exercises" },
  { href: "/programs", label: "Programs" },
  { href: "/routine", label: "Daily Routine" },
  { href: "/ageing", label: "Healthy Ageing" },
  { href: "/learn", label: "Learn" },
  { href: "/progress", label: "Progress" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { profile } = useProfile();
  const easyLinks = [
    { href: "/", label: "Home" },
    { href: "/exercises", label: "Exercises" },
    { href: "/routine", label: "Routine" },
    { href: "/profile", label: "Profile" },
  ];
  const desktop = profile.easyView ? easyLinks : links;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="mr-2 flex items-center gap-2 rounded-md">
          <span className="grid size-9 place-items-center rounded-full bg-forest text-sm font-semibold text-white" aria-hidden="true">
            स
          </span>
          <span>
            <span className="block font-heading text-xl leading-none text-forest">{brand.name}</span>
            <span className="easy-hide block text-sm text-stone">{brand.tagline}</span>
          </span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
          {desktop.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 ${active ? "bg-accent text-ink" : "text-stone hover:bg-muted"}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/search" className="rounded-full p-2" aria-label="Search">
            <Search className="size-5" />
          </Link>
          {profile.easyView ? null : (
            <Link href="/profile" className="rounded-full px-3 py-2 hover:bg-muted">
              Profile
            </Link>
          )}
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link href="/search" className="grid size-11 place-items-center rounded-full" aria-label="Search">
            <Search className="size-5" />
          </Link>
          <Sheet>
            <SheetTrigger render={<Button variant="outline" className="min-h-11 min-w-11" aria-label="Open menu" />}>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>{brand.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4" aria-label="Mobile">
                {[...links, { href: "/search", label: "Search" }, { href: "/profile", label: "Profile" }, { href: "/safety", label: "Safety" }].map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl px-3 py-3 hover:bg-muted">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
