import Link from "next/link";
import type { Exercise } from "@/lib/types";
import { appearanceFromSlug } from "@/lib/appearance";
import { levelLabel, pillarLabel } from "@/lib/labels";
import { Figure } from "@/components/illustration/Figure";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const pose = exercise.variations[0]?.sequence[0]?.pose ?? "stand";
  return (
    <Link
      href={`/exercises/${exercise.slug}`}
      className="flex h-full flex-col rounded-2xl bg-paper p-4 shadow-sm ring-1 ring-border transition hover:-translate-y-0.5"
    >
      <Figure
        pose={pose}
        appearance={appearanceFromSlug(exercise.slug)}
        className="h-40"
        title={`${exercise.name}, starting position`}
      />
      <p className="mt-3 font-heading text-2xl">{exercise.name}</p>
      {exercise.traditionalName ? <p className="text-stone">{exercise.traditionalName}</p> : null}
      <p className="mt-2 flex-1">{exercise.summary}</p>
      <p className="mt-3 text-stone">
        {exercise.pillars.map((pillar) => pillarLabel[pillar]).join(" · ")} ·{" "}
        {exercise.variations.map((item) => levelLabel[item.level]).join(", ")}
      </p>
    </Link>
  );
}
