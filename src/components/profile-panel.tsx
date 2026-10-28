"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AccessibilityControls } from "@/components/accessibility-controls";
import { useProfile } from "@/lib/profile";
import { clearPersonalData, defaultProfile } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { AGE_BANDS, GOALS, type AgeBand, type Goal } from "@/lib/types";
import { ageLabel, goalLabel } from "@/lib/labels";

export function ProfilePanel() {
  const { profile, update, replace } = useProfile();
  const router = useRouter();
  const [cleared, setCleared] = useState(false);

  return (
    <div className="space-y-6">
      <AccessibilityControls />
      <fieldset className="rounded-2xl bg-paper p-4 ring-1 ring-border">
        <legend className="px-1 font-heading text-2xl">Personalization</legend>
        <p className="mt-2">
          Answers stay on this device. Swasthya does not sell personal health information, and you can browse exercises without an account.
        </p>
        <label className="mt-3 flex min-h-12 items-center gap-3">
          <input
            type="checkbox"
            className="size-5"
            checked={profile.personalization}
            onChange={(event) => update({ personalization: event.target.checked })}
          />
          Use my answers to shape routines
        </label>
        <label className="mt-3 block">
          Age range
          <select
            className="mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-3"
            value={profile.ageBand ?? ""}
            onChange={(event) => update({ ageBand: (event.target.value || null) as AgeBand | null })}
          >
            <option value="">Not set</option>
            {AGE_BANDS.map((age) => (
              <option key={age} value={age}>
                {ageLabel[age]}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-3 grid gap-2">
          {GOALS.map((goal) => (
            <label key={goal} className="flex min-h-11 items-center gap-3">
              <input
                type="checkbox"
                className="size-5"
                checked={profile.goals.includes(goal)}
                onChange={(event) => {
                  const goals = event.target.checked
                    ? [...profile.goals, goal]
                    : profile.goals.filter((item) => item !== goal);
                  update({ goals: goals as Goal[] });
                }}
              />
              {goalLabel[goal]}
            </label>
          ))}
        </div>
        <label className="mt-3 flex min-h-12 items-center gap-3">
          <input
            type="checkbox"
            className="size-5"
            checked={profile.floorComfort === false}
            onChange={(event) => update({ floorComfort: event.target.checked ? false : true })}
          />
          Prefer no floor exercises
        </label>
      </fieldset>
      <section className="rounded-2xl bg-paper p-4 ring-1 ring-border">
        <h2 className="font-heading text-2xl">Your data</h2>
        <p className="mt-2">Delete the profile, practice history, saved movements, and movement check stored in this browser.</p>
        <Button
          type="button"
          variant="destructive"
          className="mt-3 bg-destructive text-white"
          onClick={() => {
            clearPersonalData();
            replace(defaultProfile);
            setCleared(true);
            router.refresh();
          }}
        >
          Delete profile and history
        </Button>
        {cleared ? <p className="mt-2">Deleted from this browser.</p> : null}
      </section>
    </div>
  );
}
