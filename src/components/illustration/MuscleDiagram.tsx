import type { Appearance, BodyArea } from "@/lib/types";
import { Figure } from "@/components/illustration/Figure";

const marks: Record<BodyArea, { cx: number; cy: number; rx: number; ry: number; label: string }> = {
  full: { cx: 120, cy: 160, rx: 70, ry: 100, label: "Full body" },
  back: { cx: 120, cy: 120, rx: 28, ry: 36, label: "Back" },
  shoulders: { cx: 120, cy: 92, rx: 42, ry: 16, label: "Shoulders" },
  hips: { cx: 120, cy: 158, rx: 34, ry: 16, label: "Hips" },
  knees: { cx: 120, cy: 204, rx: 36, ry: 14, label: "Knees" },
  legs: { cx: 120, cy: 214, rx: 40, ry: 42, label: "Legs" },
  core: { cx: 120, cy: 128, rx: 22, ry: 24, label: "Core" },
  ankles: { cx: 120, cy: 252, rx: 36, ry: 12, label: "Ankles" },
  wrists: { cx: 120, cy: 150, rx: 46, ry: 12, label: "Wrists" },
  neck: { cx: 120, cy: 70, rx: 16, ry: 12, label: "Neck" },
};

export function MuscleDiagram({
  areas,
  appearance,
  caption,
}: {
  areas: BodyArea[];
  appearance: Appearance;
  caption: string;
}) {
  const shown = areas.length ? areas : (["full"] as BodyArea[]);
  return (
    <figure className="rounded-2xl bg-paper p-4 ring-1 ring-border">
      <figcaption className="mb-2 font-medium">Where you may feel the work</figcaption>
      <div className="relative mx-auto max-w-xs">
        <Figure pose="stand" appearance={appearance} className="h-64 w-full" title={caption} />
        <svg viewBox="0 0 240 300" className="pointer-events-none absolute inset-0 h-64 w-full" aria-hidden="true">
          {shown.map((area) => {
            const mark = marks[area];
            return (
              <ellipse
                key={area}
                cx={mark.cx}
                cy={mark.cy}
                rx={mark.rx}
                ry={mark.ry}
                fill="#9c4a32"
                opacity="0.28"
              />
            );
          })}
        </svg>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {shown.map((area) => (
          <li key={area} className="rounded-full bg-accent px-3 py-1 text-base">
            {marks[area].label}
          </li>
        ))}
      </ul>
      <p className="sr-only">{caption}</p>
    </figure>
  );
}
