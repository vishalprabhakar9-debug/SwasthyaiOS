import type { Appearance, Pose } from "@/lib/types";
import { layoutPose, type Pt } from "@/components/illustration/poses";

const SKIN = ["#f0c7a8", "#c68658", "#8d552e", "#5c3317"] as const;
const CLOTH = ["#1f4d40", "#9c4a32"] as const;
const HAIR: Record<Appearance["generation"], string> = {
  "20s": "#241c18",
  "30s": "#3a312b",
  "40s": "#5c534c",
  "50s": "#7a736c",
  "60s": "#a8a29a",
  "70s": "#e4ddd4",
};

const UPRIGHT = new Set<Pose>([
  "stand",
  "armRaise",
  "breath",
  "breathHold",
  "tree",
  "march",
  "rush",
  "kneeRaise",
  "tandem",
  "singleLeg",
  "sideBend",
  "calf",
  "walk",
  "spinalTwist",
  "shoulderOpen",
  "hipOpen",
  "neckTurn",
  "wristFlex",
  "forcedReach",
]);

function limb(a: Pt, b: Pt, c: Pt, color: string) {
  return `M ${a.x} ${a.y} Q ${b.x} ${b.y} ${c.x} ${c.y}`;
}

export function Figure({
  pose,
  appearance,
  className = "",
  title,
}: {
  pose: Pose;
  appearance: Appearance;
  className?: string;
  title?: string;
}) {
  const layout = layoutPose(pose);
  const skin = SKIN[appearance.tone];
  const cloth = CLOTH[appearance.presentation === "a" ? 0 : 1];
  const hair = HAIR[appearance.generation];
  const lean =
    (appearance.generation === "60s" || appearance.generation === "70s") && UPRIGHT.has(pose) ? 8 : 0;
  const width = appearance.width === "narrow" ? 0.9 : appearance.width === "broad" ? 1.12 : 1;
  const head = { x: layout.head.x + lean, y: layout.head.y };
  const neck = { x: layout.neck.x + lean * 0.6, y: layout.neck.y };

  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <ellipse cx="120" cy={layout.groundY + 6} rx="78" ry="8" fill="#e7d7c3" />
      {layout.wall ? <rect x="28" y="36" width="10" height="236" rx="2" fill="#d9c7b0" /> : null}
      {layout.support ? <rect x="36" y="70" width="8" height="200" rx="2" fill="#c4a484" /> : null}
      {layout.chair ? (
        <g>
          <rect
            x={layout.chair.x}
            y={layout.chair.y - 78}
            width="10"
            height="78"
            rx="2"
            fill="#8c6a45"
          />
          <rect x={layout.chair.x} y={layout.chair.y} width={layout.chair.w} height="12" rx="2" fill="#8c6a45" />
          <rect x={layout.chair.x + 8} y={layout.chair.y + 12} width="8" height="70" fill="#a78462" />
          <rect
            x={layout.chair.x + layout.chair.w - 16}
            y={layout.chair.y + 12}
            width="8"
            height="70"
            fill="#a78462"
          />
        </g>
      ) : null}
      <g transform={`translate(120 0) scale(${width} 1) translate(-120 0)`}>
        <path
          d={limb(layout.hip, layout.kneeL, layout.footL, skin)}
          fill="none"
          stroke={skin}
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={limb(layout.hip, layout.kneeR, layout.footR, skin)}
          fill="none"
          stroke={skin}
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${neck.x} ${neck.y} L ${layout.hip.x} ${layout.hip.y}`}
          fill="none"
          stroke={cloth}
          strokeWidth={appearance.width === "broad" ? 28 : 22}
          strokeLinecap="round"
        />
        <path
          d={limb(layout.shoulderL, layout.elbowL, layout.handL, skin)}
          fill="none"
          stroke={skin}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={limb(layout.shoulderR, layout.elbowR, layout.handR, skin)}
          fill="none"
          stroke={skin}
          strokeWidth="12"
          strokeLinecap="round"
        />
        <circle cx={head.x} cy={head.y} r="18" fill={skin} />
        {appearance.presentation === "a" ? (
          <path
            d={`M ${head.x - 16} ${head.y - 2} Q ${head.x} ${head.y - 28} ${head.x + 16} ${head.y - 2} Q ${head.x} ${head.y - 8} ${head.x - 16} ${head.y - 2}`}
            fill={hair}
          />
        ) : (
          <g>
            <path
              d={`M ${head.x - 16} ${head.y} Q ${head.x} ${head.y - 30} ${head.x + 18} ${head.y + 2}`}
              fill={hair}
            />
            <circle cx={head.x + 16} cy={head.y + 8} r="8" fill={hair} />
          </g>
        )}
        <circle cx={head.x + 6} cy={head.y - 1} r="1.4" fill="#1c1917" />
        {pose === "breathHold" ? (
          <circle cx={head.x + 20} cy={head.y + 4} r="6" fill="none" stroke="#9c4a32" strokeWidth="2" />
        ) : null}
        {pose === "rush" ? (
          <g stroke="#8a6a1f" strokeWidth="2" strokeLinecap="round">
            <path d="M40 120 H68" />
            <path d="M32 140 H64" />
            <path d="M44 160 H70" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
