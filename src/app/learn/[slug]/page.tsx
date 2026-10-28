import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/content/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getArticle(slug)?.title ?? "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <p className="text-terracotta">{article.category}</p>
      <h1 className="font-heading text-5xl">{article.title}</h1>
      <p className="text-xl">{article.summary}</p>
      {article.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-heading text-3xl">{section.heading}</h2>
          <p className="mt-2">{section.body}</p>
        </section>
      ))}
      <section>
        <h2 className="font-heading text-2xl">References for review</h2>
        <ul className="mt-2 space-y-2">
          {article.references.map((reference) => (
            <li key={reference.title}>
              <p className="font-medium">{reference.title}</p>
              <p className="text-stone">{reference.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
