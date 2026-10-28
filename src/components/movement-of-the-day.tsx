"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { exercises } from "@/content/exercises";
import { appearanceFromSlug } from "@/lib/appearance";
import { Figure } from "@/components/illustration/Figure";
import { buttonVariants } from "@/components/ui/button";

export function MovementOfTheDay() {
  const fallback = exercises.find((item) => item.slug === "basic-baithak") ?? exercises[0];
  const [exercise, setExercise] = useState(fallback);

  useEffect(() => {
    const index = Math.floor(Date.now() / 86_400_000) % exercises.length;
    setExercise(exercises[index]);
  }, []);

  const pose = exercise.variations[0]?.sequence[1]?.pose ?? exercise.variations[0]?.sequence[0]?.pose ?? "stand";

  return (
    <article className="grid items-center gap-6 rounded-3xl bg-paper p-5 ring-1 ring-border md:grid-cols-[240px_1fr]">
      <Figure pose={pose} appearance={appearanceFromSlug(exercise.slug)} className="h-56" title={exercise.name} />
      <div>
        <p className="font-medium text-terracotta">Movement of the day</p>
        <h3 className="mt-1 font-heading text-4xl">{exercise.name}</h3>
        {exercise.traditionalName ? <p className="text-stone">{exercise.traditionalName}</p> : null}
        <p className="mt-3">{exercise.summary}</p>
        <ul className="mt-3 list-disc pl-5">
          {exercise.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
        <Link href={`/exercises/${exercise.slug}`} className={`${buttonVariants({ size: "lg" })} mt-4`}>
          Learn the movement
        </Link>
      </div>
    </article>
  );
}
