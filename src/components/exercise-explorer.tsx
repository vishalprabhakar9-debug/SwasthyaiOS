"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { exercises } from "@/content/exercises";
import { ageBanner, filterExercises, type ExerciseFilters } from "@/lib/filters";
import { AGE_BANDS, BODY_AREAS, LEVELS, PILLARS, POSITIONS, type AgeBand, type BodyArea, type Level, type Pillar, type Position } from "@/lib/types";
import { ageLabel, areaLabel, categoryLabel, levelLabel, pillarLabel, positionLabel } from "@/lib/labels";
import { ExerciseCard } from "@/components/exercise-card";
import { useProfile } from "@/lib/profile";

const durations = [
  { id: "", label: "Any duration" },
  { id: "under-5", label: "Under 5 minutes" },
  { id: "5-10", label: "5–10 minutes" },
  { id: "10-20", label: "10–20 minutes" },
  { id: "20-plus", label: "20+ minutes" },
] as const;

export function ExerciseExplorer() {
  const params = useSearchParams();
  const router = useRouter();
  const { profile } = useProfile();
  const [showAll, setShowAll] = useState(false);
  const filters: ExerciseFilters = {
    goal: (params.get("goal") as Pillar) || "",
    level: (params.get("level") as Level) || "",
    position: (params.get("position") as Position) || "",
    area: (params.get("area") as BodyArea) || "",
    duration: (params.get("duration") as ExerciseFilters["duration"]) || "",
    category: params.get("category") || "",
    age: (params.get("age") as AgeBand) || "",
  };

  function update(next: Partial<ExerciseFilters>) {
    const merged = { ...filters, ...next };
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(merged)) {
      if (value) query.set(key, value);
    }
    router.replace(query.size ? `/exercises?${query}` : "/exercises");
    setShowAll(false);
  }

  const results = useMemo(() => filterExercises(filters), [params]);
  const visible = profile.easyView && !showAll ? results.slice(0, 6) : results;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-2xl bg-paper p-4 ring-1 ring-border md:grid-cols-3">
        <Select label="Goal" value={filters.goal ?? ""} onChange={(goal) => update({ goal: goal as Pillar })} options={[["" , "Any goal"], ...PILLARS.map((item) => [item, pillarLabel[item]] as const)]} />
        <Select label="Difficulty" value={filters.level ?? ""} onChange={(level) => update({ level: level as Level })} options={[["", "Any level"], ...LEVELS.map((item) => [item, levelLabel[item]] as const)]} />
        <Select label="Position" value={filters.position ?? ""} onChange={(position) => update({ position: position as Position })} options={[["", "Any position"], ...POSITIONS.map((item) => [item, positionLabel[item]] as const)]} />
        <Select label="Body area" value={filters.area ?? ""} onChange={(area) => update({ area: area as BodyArea })} options={[["", "Any area"], ...BODY_AREAS.map((item) => [item, areaLabel[item]] as const)]} />
        <Select label="Duration" value={filters.duration ?? ""} onChange={(duration) => update({ duration: duration as ExerciseFilters["duration"] })} options={durations.map((item) => [item.id, item.label] as const)} />
        <Select label="Tradition" value={filters.category ?? ""} onChange={(category) => update({ category })} options={[["", "All traditions"], ...Object.entries(categoryLabel)]} />
      </div>
      {filters.age ? (
        <p className="rounded-2xl bg-accent px-4 py-3">{ageBanner(filters.age)}</p>
      ) : null}
      <div className="flex flex-wrap gap-2" aria-label="Age emphasis">
        {AGE_BANDS.map((age) => (
          <button
            key={age}
            type="button"
            aria-pressed={filters.age === age}
            className={`min-h-11 rounded-full px-3 ${filters.age === age ? "bg-forest text-white" : "bg-muted"}`}
            onClick={() => update({ age: filters.age === age ? "" : age })}
          >
            {ageLabel[age]}
          </button>
        ))}
      </div>
      <p>
        {results.length} movement{results.length === 1 ? "" : "s"}
        {profile.easyView && results.length > 6 && !showAll ? ", showing 6 at a time" : ""}.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((exercise) => (
          <ExerciseCard key={exercise.slug} exercise={exercise} />
        ))}
      </div>
      {results.length === 0 ? <p>No movements match these filters. Clear one and the library will open up.</p> : null}
      {profile.easyView && results.length > visible.length ? (
        <button type="button" className="min-h-12 rounded-full bg-forest px-5 text-white" onClick={() => setShowAll(true)}>
          Show all {results.length}
        </button>
      ) : null}
      <p className="sr-only">Library size {exercises.length}</p>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [string, string])[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-medium">{label}</span>
      <select
        className="min-h-12 w-full rounded-xl border border-border bg-background px-3"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(([id, name]) => (
          <option key={id || "any"} value={id}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
