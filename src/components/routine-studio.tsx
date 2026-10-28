"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buildRoutine, durationOptions } from "@/lib/routine-engine";
import { useProfile } from "@/lib/profile";
import { loadSaved, ROUTINE_KEY } from "@/lib/storage";
import type { DurationMinutes, Level, RoutineRequest } from "@/lib/types";
import { LEVELS } from "@/lib/types";
import { levelLabel } from "@/lib/labels";
import { SafetyBanner } from "@/components/safety-banner";
import { Button } from "@/components/ui/button";
import { getProgram } from "@/content/programs";

export function RoutineStudio() {
  const params = useSearchParams();
  const router = useRouter();
  const { profile } = useProfile();
  const [saved, setSaved] = useState<string[]>([]);
  const initialDuration = Number(params.get("minutes"));
  const duration = ([5, 10, 15, 20, 30, 45].includes(initialDuration) ? initialDuration : 20) as DurationMinutes;
  const [request, setRequest] = useState<RoutineRequest>({
    duration,
    intensity: (params.get("level") as Level) || "auto",
    floor: params.get("floor") === "no" ? false : params.get("floor") === "yes" ? true : null,
    balanceSupport: params.get("balance") === "support",
    preset: (params.get("preset") as RoutineRequest["preset"]) || null,
    programSlug: params.get("program"),
    includeSaved: true,
  });

  useEffect(() => {
    setSaved(loadSaved());
  }, []);

  const plan = useMemo(() => buildRoutine(profile, request, saved), [profile, request, saved]);
  const program = request.programSlug ? getProgram(request.programSlug) : undefined;

  function start() {
    sessionStorage.setItem(ROUTINE_KEY, JSON.stringify(plan));
    router.push("/routine/play");
  }

  return (
    <div className="space-y-6">
      <SafetyBanner compact />
      {program ? <p className="rounded-2xl bg-accent px-4 py-3">Building from {program.name}. {program.ageNote}</p> : null}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {durationOptions.map((option) => (
          <button
            key={option.preset}
            type="button"
            className={`min-h-20 rounded-2xl px-4 text-left ring-1 ring-border ${request.preset === option.preset && request.duration === option.minutes ? "bg-forest text-white" : "bg-paper"}`}
            onClick={() => setRequest((current) => ({ ...current, duration: option.minutes, preset: option.preset, programSlug: null }))}
          >
            <span className="block font-heading text-2xl">{option.minutes} min</span>
            {option.name}
          </button>
        ))}
        <button
          type="button"
          className={`min-h-20 rounded-2xl px-4 text-left ring-1 ring-border ${request.preset === "morning" ? "bg-forest text-white" : "bg-paper"}`}
          onClick={() => setRequest((current) => ({ ...current, duration: 10, preset: "morning", programSlug: null }))}
        >
          <span className="block font-heading text-2xl">Morning</span>
          Mobility, 10 minutes
        </button>
        <button
          type="button"
          className={`min-h-20 rounded-2xl px-4 text-left ring-1 ring-border ${request.preset === "evening" ? "bg-forest text-white" : "bg-paper"}`}
          onClick={() => setRequest((current) => ({ ...current, duration: 10, preset: "evening", programSlug: null }))}
        >
          <span className="block font-heading text-2xl">Evening</span>
          Recovery and breath
        </button>
      </div>
      <fieldset className="grid gap-4 rounded-2xl bg-paper p-4 ring-1 ring-border md:grid-cols-2">
        <legend className="px-1 font-heading text-2xl">Adjust this session</legend>
        <label>
          Intensity
          <select
            className="mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-3"
            value={request.intensity}
            onChange={(event) => setRequest((current) => ({ ...current, intensity: event.target.value as Level | "auto" }))}
          >
            <option value="auto">Match my settings</option>
            {LEVELS.map((level) => (
              <option key={level} value={level}>
                {levelLabel[level]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex min-h-12 items-center gap-3">
          <input
            type="checkbox"
            className="size-5"
            checked={request.floor === false}
            onChange={(event) => setRequest((current) => ({ ...current, floor: event.target.checked ? false : true }))}
          />
          No floor exercises
        </label>
        <label className="flex min-h-12 items-center gap-3">
          <input
            type="checkbox"
            className="size-5"
            checked={request.balanceSupport}
            onChange={(event) => setRequest((current) => ({ ...current, balanceSupport: event.target.checked }))}
          />
          Keep balance support close
        </label>
        <label className="flex min-h-12 items-center gap-3">
          <input
            type="checkbox"
            className="size-5"
            checked={request.includeSaved}
            onChange={(event) => setRequest((current) => ({ ...current, includeSaved: event.target.checked }))}
          />
          Include saved movements ({saved.length})
        </label>
      </fieldset>
      <section className="rounded-3xl bg-paper p-5 ring-1 ring-border" aria-live="polite">
        <h2 className="font-heading text-3xl">{plan.title}</h2>
        <p className="text-stone">{plan.minutes} minutes</p>
        {plan.notice ? <p className="mt-3 rounded-xl bg-[#f8efe6] px-3 py-3">{plan.notice}</p> : null}
        {plan.omittedNote ? <p className="mt-3">{plan.omittedNote}</p> : null}
        <div className="mt-4 space-y-4">
          {plan.blocks.map((block) => (
            <div key={block.id}>
              <h3 className="font-heading text-2xl">
                {block.title} — {block.minutes} min
              </h3>
              <ol className="mt-2 list-decimal pl-5">
                {block.items.map((item) => (
                  <li key={item.exerciseSlug}>
                    <Link href={`/exercises/${item.exerciseSlug}`} className="underline decoration-sandalwood underline-offset-4">
                      {item.exerciseName}
                    </Link>{" "}
                    · {item.variationName} · {item.reps}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <Button type="button" size="lg" className="mt-6" onClick={start} disabled={!plan.blocks.length}>
          Start this practice
        </Button>
      </section>
    </div>
  );
}
