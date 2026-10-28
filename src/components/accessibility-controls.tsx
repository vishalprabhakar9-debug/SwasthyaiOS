"use client";

import { useProfile } from "@/lib/profile";

export function AccessibilityControls() {
  const { profile, update } = useProfile();
  return (
    <fieldset className="rounded-2xl bg-paper p-4 ring-1 ring-border">
      <legend className="px-1 font-heading text-2xl">Reading and view</legend>
      <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Text size">
        {(
          [
            ["normal", "Normal text"],
            ["large", "Large text"],
            ["xlarge", "Extra-large text"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={profile.textSize === value}
            className={`min-h-11 rounded-full px-4 ${profile.textSize === value ? "bg-forest text-white" : "bg-muted"}`}
            onClick={() => update({ textSize: value })}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="mt-4 flex min-h-11 items-center gap-3">
        <input
          type="checkbox"
          className="size-5"
          checked={profile.easyView}
          onChange={(event) => update({ easyView: event.target.checked })}
        />
        Easy View: larger controls, more space, simpler navigation, chair-friendly suggestions
      </label>
      <label className="mt-2 flex min-h-11 items-center gap-3">
        <input
          type="checkbox"
          className="size-5"
          checked={profile.reducedMotion}
          onChange={(event) => update({ reducedMotion: event.target.checked })}
        />
        Reduce motion
      </label>
    </fieldset>
  );
}
