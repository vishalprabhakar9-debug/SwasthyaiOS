import type { Metadata } from "next";
import { Suspense } from "react";
import { ExerciseExplorer } from "@/components/exercise-explorer";

export const metadata: Metadata = { title: "Exercises" };

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <header>
        <h1 className="font-heading text-5xl">Exercise library</h1>
        <p className="mt-3 max-w-3xl">
          Every movement has more than one path. Filter by goal, level, position, or body area. Age can sort suggestions. It does not lock you out of a practice.
        </p>
      </header>
      <Suspense fallback={<p>Loading the library…</p>}>
        <ExerciseExplorer />
      </Suspense>
    </div>
  );
}
