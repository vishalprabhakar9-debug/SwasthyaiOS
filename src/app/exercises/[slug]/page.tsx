import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exercises, getExercise } from "@/content/exercises";
import { appearanceFromSlug } from "@/lib/appearance";
import { levelLabel, pillarLabel } from "@/lib/labels";
import { MuscleDiagram } from "@/components/illustration/MuscleDiagram";
import { VariationTabs } from "@/components/variation-tabs";
import { SaveExerciseButton } from "@/components/save-exercise-button";
import { SafetyBanner } from "@/components/safety-banner";

export function generateStaticParams() {
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExercise(slug);
  return { title: exercise?.name ?? "Exercise" };
}

export default async function ExercisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exercise = getExercise(slug);
  if (!exercise) notFound();
  const easier = exercise.variations[0];
  const harder = exercise.variations[exercise.variations.length - 1];

  return (
    <article className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <header className="space-y-3">
        <p className="text-terracotta">{exercise.traditionalName ?? "Indian movement practice"}</p>
        <h1 className="font-heading text-5xl">{exercise.name}</h1>
        <p className="text-xl">{exercise.summary}</p>
        <p className="text-stone">
          {exercise.pillars.map((pillar) => pillarLabel[pillar]).join(" · ")} ·{" "}
          {exercise.variations.map((item) => levelLabel[item.level]).join(", ")}
        </p>
        <div className="flex flex-wrap gap-3">
          <SaveExerciseButton slug={exercise.slug} />
          <Link href="/routine" className="inline-flex min-h-11 items-center rounded-lg border border-border px-4">
            Build a routine
          </Link>
        </div>
      </header>
      <SafetyBanner compact />
      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          <h2 className="font-heading text-3xl">Context</h2>
          <p>{exercise.context}</p>
          <h2 className="font-heading text-3xl">Purpose</h2>
          <p>{exercise.purpose}</p>
          <p>{exercise.ageGuidance}</p>
        </div>
        <MuscleDiagram
          areas={exercise.bodyAreas}
          appearance={appearanceFromSlug(exercise.slug)}
          caption={`${exercise.name} mainly involves ${exercise.muscles.join(", ")}.`}
        />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-paper p-4 ring-1 ring-border">
          <h2 className="font-heading text-2xl">You may notice</h2>
          <ul className="mt-2 list-disc pl-5">
            {exercise.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-paper p-4 ring-1 ring-border">
          <h2 className="font-heading text-2xl">Common mistakes</h2>
          <ul className="mt-2 list-disc pl-5">
            {exercise.commonMistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="font-heading text-3xl">Paths</h2>
        <p className="mt-2">
          Easier: {easier.name}. More demanding: {harder.name}. Choose the path that lets you breathe and repeat the shape.
        </p>
        <div className="mt-4">
          <VariationTabs exercise={exercise} />
        </div>
      </section>
      <section>
        <h2 className="font-heading text-2xl">Safety notes</h2>
        <ul className="mt-2 list-disc pl-5">
          {exercise.precautions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">Breathing for this movement: {exercise.breathing}</p>
      </section>
    </article>
  );
}
