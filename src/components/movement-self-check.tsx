"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CHECK_KEY } from "@/lib/storage";
import type { MovementCheck } from "@/lib/types";
import { observationDisclaimer } from "@/content/safety";

const empty: MovementCheck = { chairRises: "", balance: "", overhead: "", floor: "", savedAt: "" };

export function MovementSelfCheck() {
  const [check, setCheck] = useState<MovementCheck>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(CHECK_KEY);
    if (raw) setCheck(JSON.parse(raw) as MovementCheck);
    setReady(true);
  }, []);

  function save(next: MovementCheck) {
    const withDate = { ...next, savedAt: new Date().toISOString() };
    setCheck(withDate);
    localStorage.setItem(CHECK_KEY, JSON.stringify(withDate));
  }

  if (!ready) return <p>Loading the movement check…</p>;

  return (
    <form
      className="space-y-5 rounded-2xl bg-paper p-4 ring-1 ring-border"
      onSubmit={(event) => {
        event.preventDefault();
        save(check);
      }}
    >
      <h2 className="font-heading text-3xl">Optional movement check</h2>
      <p>{observationDisclaimer}</p>
      <Field
        label="How many controlled chair rises can you comfortably perform?"
        value={check.chairRises}
        options={["A few", "About 5 to 8", "More than 8", "Prefer not to try"]}
        onChange={(chairRises) => setCheck({ ...check, chairRises })}
      />
      <Field
        label="How long can you comfortably balance on one leg while standing near support?"
        value={check.balance}
        options={["A few seconds", "About 10 seconds", "20 seconds or more", "Prefer not to try"]}
        onChange={(balance) => setCheck({ ...check, balance })}
      />
      <Field
        label="Can your arms comfortably reach overhead?"
        value={check.overhead}
        options={["Yes, both arms", "One side is easier", "Not comfortably", "Prefer not to try"]}
        onChange={(overhead) => setCheck({ ...check, overhead })}
      />
      <Field
        label="Can you comfortably sit down and rise from the floor?"
        value={check.floor}
        options={["Yes", "With support", "Not currently", "Prefer not to try"]}
        onChange={(floor) => setCheck({ ...check, floor })}
      />
      <button type="submit" className="min-h-12 rounded-full bg-forest px-5 text-white">
        Save these observations
      </button>
      {check.savedAt ? (
        <div className="space-y-2">
          <p>Saved on this device. These are observations about movement, not a result to pass or fail.</p>
          <p>
            {check.balance.startsWith("A few") || check.balance === "Prefer not to try" ? (
              <Link href="/exercises?goal=balance&position=chair" className="underline">
                See supported balance exercises.
              </Link>
            ) : (
              <Link href="/exercises?goal=balance" className="underline">
                See balance exercises.
              </Link>
            )}
          </p>
          {check.floor === "Not currently" ? (
            <p>
              <Link href="/programs/no-floor-routine" className="underline">
                A no-floor routine is ready.
              </Link>
            </p>
          ) : null}
          {check.chairRises === "A few" ? (
            <p>
              <Link href="/exercises/chair-sit-to-stand" className="underline">
                Chair sit-to-stand is a useful place to practice leg strength.
              </Link>
            </p>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-medium">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={value === option}
            className={`min-h-11 rounded-full px-3 ${value === option ? "bg-forest text-white" : "bg-muted"}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
