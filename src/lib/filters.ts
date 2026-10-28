import { exercises } from "@/content/exercises";
import type { AgeBand, BodyArea, Exercise, Level, Pillar, Position } from "@/lib/types";
import { ageEmphasis } from "@/lib/labels";

export interface ExerciseFilters {
  goal?: Pillar | "";
  level?: Level | "";
  position?: Position | "";
  area?: BodyArea | "";
  duration?: "under-5" | "5-10" | "10-20" | "20-plus" | "";
  category?: string;
  age?: AgeBand | "";
}

function durationMatch(minutes: number, bucket: ExerciseFilters["duration"]) {
  if (!bucket) return true;
  if (bucket === "under-5") return minutes < 5;
  if (bucket === "5-10") return minutes >= 5 && minutes <= 10;
  if (bucket === "10-20") return minutes > 10 && minutes <= 20;
  return minutes > 20;
}

const agePillars: Record<AgeBand, Pillar[]> = {
  "18-29": ["strength", "endurance", "mobility"],
  "30-39": ["strength", "mobility"],
  "40-49": ["mobility", "flexibility", "balance", "recovery"],
  "50-59": ["strength", "balance", "mobility"],
  "60-69": ["balance", "mobility", "strength"],
  "70-79": ["balance", "mobility", "recovery"],
  "80+": ["mobility", "balance", "recovery"],
};

export function filterExercises(filters: ExerciseFilters): Exercise[] {
  const list = exercises.filter((exercise) => {
    if (filters.goal && !exercise.pillars.includes(filters.goal)) return false;
    if (filters.level && !exercise.variations.some((item) => item.level === filters.level)) return false;
    if (filters.position && !exercise.positions.includes(filters.position)) return false;
    if (filters.area && !exercise.bodyAreas.includes(filters.area)) return false;
    if (filters.category && exercise.category !== filters.category) return false;
    if (!durationMatch(exercise.durationMinutes, filters.duration)) return false;
    return true;
  });
  if (!filters.age) return list;
  const focus = agePillars[filters.age];
  return [...list].sort((a, b) => {
    const as = a.pillars.some((pillar) => focus.includes(pillar)) ? 1 : 0;
    const bs = b.pillars.some((pillar) => focus.includes(pillar)) ? 1 : 0;
    return bs - as;
  });
}

export function ageBanner(age: AgeBand) {
  return `Suggested emphasis for ${age}: ${ageEmphasis[age]} Age changes the suggestion. It does not set the difficulty.`;
}
