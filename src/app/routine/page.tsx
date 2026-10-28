import type { Metadata } from "next";
import { Suspense } from "react";
import { RoutineStudio } from "@/components/routine-studio";

export const metadata: Metadata = { title: "Daily routine" };

export default function RoutinePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Your movement routine</h1>
      <p className="max-w-3xl">
        Pick a length, then change the floor, the support, and the intensity. The plan prefers safety and accessibility. It does not make medical decisions.
      </p>
      <Suspense fallback={<p>Preparing the builder…</p>}>
        <RoutineStudio />
      </Suspense>
    </div>
  );
}
