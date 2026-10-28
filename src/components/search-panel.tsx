"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchContent } from "@/lib/search";
import { ExerciseCard } from "@/components/exercise-card";
import { ProgramCard } from "@/components/program-card";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim().length > 1 ? searchContent(query) : null), [query]);

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="font-medium">Search movements, programs, and articles</span>
        <input
          className="mt-2 min-h-14 w-full rounded-2xl border border-border bg-paper px-4"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try beginner baithak, stiff shoulders, or no floor"
        />
      </label>
      {results ? (
        <div className="space-y-8">
          <section>
            <h2 className="font-heading text-2xl">Exercises</h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {results.exerciseHits.slice(0, 6).map((hit) => (
                <ExerciseCard key={hit.exercise.slug} exercise={hit.exercise} />
              ))}
            </div>
            {results.exerciseHits.length === 0 ? <p>No exercises matched.</p> : null}
          </section>
          <section>
            <h2 className="font-heading text-2xl">Programs</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {results.programHits.map((hit) => (
                <ProgramCard key={hit.program.slug} program={hit.program} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="font-heading text-2xl">Learn</h2>
            <ul className="mt-3 space-y-2">
              {results.articleHits.map((hit) => (
                <li key={hit.article.slug}>
                  <Link href={`/learn/${hit.article.slug}`} className="underline">
                    {hit.article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <p className="text-stone">Examples: exercise for stiff shoulders, 10 minute morning routine, standing exercises for seniors.</p>
      )}
    </div>
  );
}
