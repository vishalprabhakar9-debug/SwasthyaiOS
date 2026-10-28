"use client";

import type { Exercise } from "@/lib/types";
import { appearanceFromSlug } from "@/lib/appearance";
import { levelLabel, positionLabel } from "@/lib/labels";
import { MovementSequence } from "@/components/illustration/MovementSequence";
import { DoDontIllustration } from "@/components/illustration/DoDontIllustration";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function VariationTabs({ exercise }: { exercise: Exercise }) {
  const appearance = appearanceFromSlug(exercise.slug);
  const first = exercise.variations[0]?.level ?? "beginner";
  return (
    <Tabs defaultValue={first}>
      <TabsList aria-label="Choose a variation">
        {exercise.variations.map((variation) => (
          <TabsTrigger key={variation.level} value={variation.level}>
            {levelLabel[variation.level]}
          </TabsTrigger>
        ))}
      </TabsList>
      {exercise.variations.map((variation) => (
        <TabsContent key={variation.level} value={variation.level} className="space-y-6 pt-4">
          <div>
            <h3 className="font-heading text-3xl">{variation.name}</h3>
            <p className="mt-2">{variation.summary}</p>
            <p className="mt-2 text-stone">
              {variation.positions.map((position) => positionLabel[position]).join(" · ")}
              {variation.chairSupported ? " · Chair can stay nearby" : ""}
              {variation.floorRequired ? " · Uses the floor" : ""}
            </p>
          </div>
          <MovementSequence frames={variation.sequence} appearance={appearance} />
          <div className="grid gap-6 lg:grid-cols-2">
            <section>
              <h4 className="font-heading text-2xl">How to practice</h4>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                {variation.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
            <section className="rounded-2xl bg-muted p-4">
              <h4 className="font-heading text-2xl">Dose</h4>
              <dl className="mt-3 space-y-2">
                <div>
                  <dt className="font-medium">Breathing</dt>
                  <dd>{variation.breathing}</dd>
                </div>
                <div>
                  <dt className="font-medium">Repetitions</dt>
                  <dd>{variation.reps}</dd>
                </div>
                <div>
                  <dt className="font-medium">Duration</dt>
                  <dd>{variation.duration}</dd>
                </div>
                <div>
                  <dt className="font-medium">Rest</dt>
                  <dd>{variation.rest}</dd>
                </div>
              </dl>
            </section>
          </div>
          <section>
            <h4 className="mb-3 font-heading text-2xl">Good form and what to avoid</h4>
            <ul className="mb-4 list-disc pl-5">
              {variation.goodForm.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {variation.avoid[0] ? (
              <DoDontIllustration
                goodPose={variation.sequence[0]?.pose ?? "stand"}
                goodCaption={variation.goodForm[0] ?? "Move in a range you can breathe through."}
                avoid={variation.avoid[0]}
                appearance={appearance}
              />
            ) : null}
          </section>
        </TabsContent>
      ))}
    </Tabs>
  );
}
