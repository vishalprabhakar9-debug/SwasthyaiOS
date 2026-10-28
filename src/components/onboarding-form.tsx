"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/profile";
import { needsConsult } from "@/lib/routine-engine";
import { consultNotice } from "@/content/safety";
import { AGE_BANDS, GOALS, LIMITATIONS, type Activity, type AgeBand, type Goal, type Limitation } from "@/lib/types";
import { activityLabel, ageLabel, goalLabel, limitationLabel } from "@/lib/labels";
import { Button } from "@/components/ui/button";
import { defaultProfile } from "@/lib/storage";

const activities: Activity[] = ["sedentary", "light", "moderate", "very"];

const abilityFields = [
  ["walk20", "Walk for 20 minutes"],
  ["floorSit", "Sit on the floor"],
  ["floorRise", "Rise from the floor"],
  ["partialSquat", "Squat partially"],
  ["armsOverhead", "Raise both arms overhead"],
  ["oneLeg", "Balance on one leg, near support if you like"],
  ["wallPushup", "Perform a wall push-up"],
] as const;

export function OnboardingForm() {
  const router = useRouter();
  const { profile, update } = useProfile();
  const [step, setStep] = useState(0);
  const steps = ["Age", "Activity", "Goals", "Current ability", "Considerations", "Floor", "Review"];

  function skip() {
    update({ ...profile, onboarded: true });
    router.push("/exercises");
  }

  function finish() {
    update({ onboarded: true });
    router.push("/routine");
  }

  return (
    <div className="space-y-6">
      <p className="text-stone">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
      <div className="h-2 rounded-full bg-muted" aria-hidden="true">
        <div className="h-2 rounded-full bg-forest" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      {step === 0 ? (
        <Choice
          label="Age range"
          value={profile.ageBand}
          options={AGE_BANDS.map((item) => [item, ageLabel[item]] as const)}
          onChange={(ageBand) => update({ ageBand: ageBand as AgeBand })}
        />
      ) : null}
      {step === 1 ? (
        <Choice
          label="Current activity"
          value={profile.activity}
          options={activities.map((item) => [item, activityLabel[item]] as const)}
          onChange={(activity) => update({ activity: activity as Activity })}
        />
      ) : null}
      {step === 2 ? (
        <fieldset>
          <legend className="font-heading text-3xl">What would you like from movement?</legend>
          <p className="mt-2 text-stone">Choose any that apply.</p>
          <div className="mt-4 grid gap-2">
            {GOALS.map((goal) => (
              <label key={goal} className="flex min-h-12 items-center gap-3 rounded-xl bg-paper px-3 ring-1 ring-border">
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
        </fieldset>
      ) : null}
      {step === 3 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Can you comfortably…</legend>
          <div className="mt-4 space-y-4">
            {abilityFields.map(([key, label]) => (
              <div key={key}>
                <p className="font-medium">{label}</p>
                <div className="mt-2 flex gap-2">
                  {([
                    [true, "Yes"],
                    [false, "Not right now"],
                  ] as const).map(([value, name]) => (
                    <button
                      key={name}
                      type="button"
                      className={`min-h-11 rounded-full px-4 ${profile.abilities[key] === value ? "bg-forest text-white" : "bg-muted"}`}
                      onClick={() => update({ abilities: { ...profile.abilities, [key]: value as boolean } })}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      ) : null}
      {step === 4 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Anything that should shape the suggestions?</legend>
          <p className="mt-2">This is not a diagnosis. It only changes which variations are offered.</p>
          <div className="mt-4 grid gap-2">
            {LIMITATIONS.map((item) => (
              <label key={item} className="flex min-h-12 items-center gap-3 rounded-xl bg-paper px-3 ring-1 ring-border">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={profile.limitations.includes(item)}
                  onChange={(event) => {
                    let limitations = event.target.checked
                      ? [...profile.limitations, item]
                      : profile.limitations.filter((entry) => entry !== item);
                    if (item === "none" && event.target.checked) limitations = ["none"];
                    if (item !== "none") limitations = limitations.filter((entry) => entry !== "none");
                    update({ limitations: limitations as Limitation[] });
                  }}
                />
                {limitationLabel[item]}
              </label>
            ))}
          </div>
          {profile.limitations.includes("other") ? (
            <label className="mt-3 block">
              A short note, kept on this device
              <input
                className="mt-1 min-h-12 w-full rounded-xl border border-border bg-background px-3"
                value={profile.limitationNote}
                onChange={(event) => update({ limitationNote: event.target.value })}
              />
            </label>
          ) : null}
        </fieldset>
      ) : null}
      {step === 5 ? (
        <fieldset>
          <legend className="font-heading text-3xl">Floor exercises</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className={`min-h-12 rounded-full px-4 ${profile.floorComfort === true ? "bg-forest text-white" : "bg-muted"}`} onClick={() => update({ floorComfort: true })}>
              Floor is fine
            </button>
            <button type="button" className={`min-h-12 rounded-full px-4 ${profile.floorComfort === false ? "bg-forest text-white" : "bg-muted"}`} onClick={() => update({ floorComfort: false })}>
              No floor today
            </button>
          </div>
        </fieldset>
      ) : null}
      {step === 6 ? (
        <div className="space-y-3">
          <h2 className="font-heading text-3xl">Your starting picture</h2>
          <p>Age is one clue. Activity, comfort, and the floor choice decide the path with it.</p>
          <ul className="list-disc pl-5">
            <li>Age: {profile.ageBand ? ageLabel[profile.ageBand] : "Not set"}</li>
            <li>Activity: {profile.activity ? activityLabel[profile.activity] : "Not set"}</li>
            <li>Goals: {profile.goals.length ? profile.goals.map((goal) => goalLabel[goal]).join(", ") : "Not set"}</li>
            <li>Floor: {profile.floorComfort === false ? "Standing and chair" : "Allowed"}</li>
          </ul>
          {needsConsult({ ...defaultProfile, ...profile, personalization: true }) ? (
            <p className="rounded-xl bg-[#f8efe6] px-3 py-3">{consultNotice}</p>
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((value) => value - 1)}>
            Back
          </Button>
        ) : null}
        {step < steps.length - 1 ? (
          <Button type="button" onClick={() => setStep((value) => value + 1)}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={finish}>
            Create my movement plan
          </Button>
        )}
        <Button type="button" variant="ghost" onClick={skip}>
          Skip and browse
        </Button>
      </div>
    </div>
  );
}

function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: readonly (readonly [string, string])[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-heading text-3xl">{label}</legend>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map(([id, name]) => (
          <button
            key={id}
            type="button"
            aria-pressed={value === id}
            className={`min-h-12 rounded-full px-4 ${value === id ? "bg-forest text-white" : "bg-paper ring-1 ring-border"}`}
            onClick={() => onChange(id)}
          >
            {name}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
