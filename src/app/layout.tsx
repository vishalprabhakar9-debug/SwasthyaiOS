import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { brand } from "@/config/brand";
import { AppShell } from "@/components/app-shell";
import { ProfileProvider } from "@/lib/profile";
import "./globals.css";

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} · ${brand.subtitle}`,
    template: `%s · ${brand.name}`,
  },
  description: "Traditional Indian bodyweight movement adapted for modern adults, from 18 to 80+.",
  applicationName: brand.name,
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1f4d40",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${source.variable} ${display.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ProfileProvider>
          <AppShell>{children}</AppShell>
        </ProfileProvider>
      </body>
    </html>
  );
}
