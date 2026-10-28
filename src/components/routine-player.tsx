"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appearanceFromSlug } from "@/lib/appearance";
import { getExercise } from "@/content/exercises";
import { Figure } from "@/components/illustration/Figure";
import { ROUTINE_KEY, saveSession } from "@/lib/storage";
import { useProfile } from "@/lib/profile";
import type { Effort, Pillar, RoutinePlan } from "@/lib/types";
import { effortLabel, pillarLabel } from "@/lib/labels";
import { Button } from "@/components/ui/button";
import { SafetyBanner } from "@/components/safety-banner";

const efforts: Effort[] = ["very-easy", "comfortable", "moderate", "challenging", "too-difficult"];

export function RoutinePlayer() {
  const router = useRouter();
  const { profile, update } = useProfile();
  const [plan, setPlan] = useState<RoutinePlan | null>(null);
  const [index, setIndex] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reps, setReps] = useState(0);
  const [done, setDone] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [started, setStarted] = useState<number | null>(null);

  const items = useMemo(() => plan?.blocks.flatMap((block) => block.items.map((item) => ({ ...item, block: block.title }))) ?? [], [plan]);
  const current = items[index];

  useEffect(() => {
    const raw = sessionStorage.getItem(ROUTINE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as RoutinePlan;
    setPlan(parsed);
    const first = parsed.blocks.flatMap((block) => block.items)[0];
    setRemaining(first?.seconds ?? 0);
    setStarted(Date.now());
  }, []);

  useEffect(() => {
    if (!current || paused || done) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [current, paused, done, index]);

  if (!plan || !current) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10">
        <p>There is no practice loaded.</p>
        <Link href="/routine" className="mt-4 inline-block underline">
          Build a routine
        </Link>
      </div>
    );
  }

  const exercise = getExercise(current.exerciseSlug);
  const appearance = appearanceFromSlug(current.exerciseSlug);

  function go(nextIndex: number) {
    const next = items[nextIndex];
    if (!next) {
      setCompletedCount(items.length);
      setDone(true);
      return;
    }
    setIndex(nextIndex);
    setRemaining(next.seconds);
    setReps(0);
    setPaused(false);
  }

  function finish(effort: Effort) {
    const elapsed = started ? Math.max(1, Math.round((Date.now() - started) / 60000)) : plan!.minutes;
    const pillarMinutes = {
      strength: 0,
      mobility: 0,
      balance: 0,
      flexibility: 0,
      endurance: 0,
      recovery: 0,
    };
    items.slice(0, completedCount).forEach((item) => {
      pillarMinutes[item.pillar] += item.seconds / 60;
    });
    saveSession({
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
      title: plan!.title,
      durationMinutes: elapsed,
      exercisesCompleted: completedCount,
      pillarMinutes,
      effort,
    });
    update({
      effortBias: effort === "too-difficult" ? -1 : effort === "very-easy" ? 1 : 0,
    });
    router.push("/progress");
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl space-y-5 px-4 py-8">
        <h1 className="font-heading text-4xl">Movement complete.</h1>
        <p>You finished {plan.title}.</p>
        <ul className="space-y-1">
          <li>Exercises completed: {completedCount}</li>
          <li>Planned length: {plan.minutes} minutes</li>
        </ul>
        <fieldset>
          <legend className="font-heading text-2xl">How did that feel?</legend>
          <div className="mt-3 grid gap-2">
            {efforts.map((effort) => (
              <Button key={effort} type="button" variant="outline" onClick={() => finish(effort)}>
                {effortLabel[effort]}
              </Button>
            ))}
          </div>
        </fieldset>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-6">
      <p className="text-stone">
        {current.block} · {index + 1} of {items.length}
      </p>
      <h1 className="font-heading text-4xl">{current.exerciseName}</h1>
      <p className="text-xl">{current.variationName}</p>
      <Figure pose={current.pose} appearance={appearance} className="mx-auto h-64 max-w-sm" title={current.cue} />
      <p className="text-xl">{current.cue}</p>
      {profile.easyView && exercise ? <p>{exercise.breathing}</p> : null}
      <p className="font-heading text-5xl tabular-nums" aria-live="polite">
        {Math.floor(remaining / 60)}:{String(remaining % 60).padStart(2, "0")}
      </p>
      <p>
        Suggested reps: {current.reps}. Counted: {reps}
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Button type="button" variant="outline" onClick={() => setPaused((value) => !value)}>
          {paused ? "Resume" : "Pause"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setReps((value) => value + 1)}>
          Count a rep
        </Button>
        <Button type="button" variant="outline" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0}>
          Previous
        </Button>
        <Button type="button" onClick={() => go(index + 1)}>
          {index === items.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
      <Button
        type="button"
        variant="ghost"
        onClick={() => {
          setCompletedCount(index + 1);
          setDone(true);
        }}
      >
        End session
      </Button>
      <SafetyBanner compact />
      <p className="text-stone">{pillarLabel[current.pillar as Pillar]}</p>
    </div>
  );
}
