import type { Appearance, Pose } from "@/lib/types";
import { Figure } from "@/components/illustration/Figure";

const people: { pose: Pose; appearance: Appearance }[] = [
  { pose: "armRaise", appearance: { tone: 1, generation: "30s", presentation: "a", width: "medium" } },
  { pose: "partialSquat", appearance: { tone: 2, generation: "50s", presentation: "b", width: "broad" } },
  { pose: "tree", appearance: { tone: 0, generation: "70s", presentation: "a", width: "narrow" } },
  { pose: "chairSit", appearance: { tone: 3, generation: "60s", presentation: "b", width: "medium" } },
];

export function HeroScene() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#efe4d4] p-4 ring-1 ring-border">
      <svg viewBox="0 0 640 220" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M40 40 H220 Q250 40 250 70 V150" fill="none" stroke="#c4a484" strokeWidth="3" />
        <circle cx="520" cy="48" r="26" fill="#e7c56a" opacity="0.7" />
        <rect x="70" y="150" width="180" height="8" rx="2" fill="#8c6a45" opacity="0.35" />
      </svg>
      <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-4">
        {people.map((person) => (
          <Figure
            key={person.pose}
            pose={person.pose}
            appearance={person.appearance}
            className="h-48"
            title="Adult practicing a bodyweight movement in a quiet courtyard"
          />
        ))}
      </div>
      <p className="relative mt-2 text-center text-stone">
        Adults of different ages, practicing with the body alone.
      </p>
    </div>
  );
}
