import type { Metadata } from "next";
import Link from "next/link";
import { articleCategories, articles } from "@/content/articles";

export const metadata: Metadata = { title: "Learn" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-5xl">Learn</h1>
      <p>
        Short articles on Indian physical culture and on movement through adulthood. Historical claims stay cautious, and each piece has a place for an expert reference.
      </p>
      {articleCategories.map((category) => (
        <section key={category}>
          <h2 className="font-heading text-2xl">{category}</h2>
          <ul className="mt-3 space-y-3">
            {articles
              .filter((article) => article.category === category)
              .map((article) => (
                <li key={article.slug} className="rounded-2xl bg-paper p-4 ring-1 ring-border">
                  <Link href={`/learn/${article.slug}`} className="font-heading text-2xl underline decoration-sandalwood underline-offset-4">
                    {article.title}
                  </Link>
                  <p className="mt-2">{article.summary}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
