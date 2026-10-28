import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPanel } from "@/components/search-panel";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Search</h1>
      <Suspense fallback={<p>Opening search…</p>}>
        <SearchPanel />
      </Suspense>
    </div>
  );
}
