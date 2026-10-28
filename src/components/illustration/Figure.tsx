import type { Appearance, Pose } from "@/lib/types";
import { layoutPose, type Pt } from "@/components/illustration/poses";

const INK = "#141210";
const PAPER = "#f7f3ec";

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
  "partialSquat",
  "baithak",
  "kneesIn",
  "chairSit",
  "chairRise",
  "ankle",
  "lunge",
]);

function curve(a: Pt, b: Pt, c: Pt) {
  return `M ${n(a.x)} ${n(a.y)} Q ${n(b.x)} ${n(b.y)} ${n(c.x)} ${n(c.y)}`;
}

function n(value: number) {
  return Math.round(value * 10) / 10;
}

function limb(a: Pt, b: Pt, c: Pt) {
  return curve(a, b, c);
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
  const lean =
    (appearance.generation === "60s" || appearance.generation === "70s") && UPRIGHT.has(pose) ? 8 : 0;
  const width = appearance.width === "narrow" ? 0.9 : appearance.width === "broad" ? 1.12 : 1;
  const head = { x: layout.head.x + lean, y: layout.head.y };
  const neck = { x: layout.neck.x + lean * 0.6, y: layout.neck.y };
  const longHair = appearance.generation === "20s" || appearance.generation === "30s" || appearance.generation === "40s";
  const tied = appearance.generation === "50s";
  const hairSide = appearance.presentation === "a" ? 1 : -1;
  const angle =
    (Math.atan2(neck.y - head.y, neck.x - head.x) - Math.PI / 2) * (180 / Math.PI);
  const handsHigh = layout.handL.y < head.y + 8 || layout.handR.y < head.y + 8;
  const hairAngle = handsHigh ? angle + 55 * hairSide : angle;
  const hairScale = Math.min(1, Math.max(0.72, (232 - head.x) / 120), Math.max(0.72, head.x / 80));
  const pattern = appearance.tone;

  return (
    <svg
      viewBox="0 0 240 300"
      className={className}
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <Ground y={layout.groundY} />
      {layout.wall ? <Wall /> : null}
      {layout.support ? <Staff /> : null}
      {layout.chair ? <Chair chair={layout.chair} /> : null}
      <g transform={`translate(120 0) scale(${width} 1) translate(-120 0)`}>
        <Hair
          head={head}
          angle={hairAngle}
          side={hairSide}
          scale={hairScale}
          style={longHair ? "long" : tied ? "tied" : "bun"}
        />
        <g fill={INK} stroke={INK} strokeLinecap="round" strokeLinejoin="round">
          <path d={limb(layout.hip, layout.kneeL, layout.footL)} fill="none" strokeWidth="22" />
          <path d={limb(layout.hip, layout.kneeR, layout.footR)} fill="none" strokeWidth="22" />
          <path d={`M ${n(neck.x)} ${n(neck.y)} L ${n(layout.hip.x)} ${n(layout.hip.y)}`} fill="none" strokeWidth={appearance.width === "broad" ? 34 : 28} />
          <path d={limb(layout.shoulderL, layout.elbowL, layout.handL)} fill="none" strokeWidth="15" />
          <path d={limb(layout.shoulderR, layout.elbowR, layout.handR)} fill="none" strokeWidth="15" />
          <circle cx={layout.footL.x} cy={layout.footL.y} r="8" />
          <circle cx={layout.footR.x} cy={layout.footR.y} r="8" />
          <circle cx={layout.handL.x} cy={layout.handL.y} r="6.5" />
          <circle cx={layout.handR.x} cy={layout.handR.y} r="6.5" />
          <circle cx={head.x} cy={head.y} r="18" />
          {UPRIGHT.has(pose) &&
          layout.footL.y > 240 &&
          layout.footR.y > 240 &&
          Math.abs(layout.kneeL.x - layout.kneeR.x) < 46 ? (
            <path
              d={`M ${n(layout.hip.x - 16)} ${n(layout.hip.y - 8)}
                L ${n(layout.footL.x - 14)} ${n(layout.footL.y)}
                L ${n(layout.footR.x + 14)} ${n(layout.footR.y)}
                L ${n(layout.hip.x + 16)} ${n(layout.hip.y - 8)} Z`}
            />
          ) : null}
        </g>
        <Garment
          neck={neck}
          hip={layout.hip}
          shoulderL={layout.shoulderL}
          shoulderR={layout.shoulderR}
          elbowL={layout.elbowL}
          elbowR={layout.elbowR}
          handL={layout.handL}
          handR={layout.handR}
          kneeL={layout.kneeL}
          kneeR={layout.kneeR}
          footL={layout.footL}
          footR={layout.footR}
          pattern={pattern}
          sari={appearance.presentation === "a"}
        />
        <Face head={head} pose={pose} />
        {pose === "breath" ? <circle cx={layout.hip.x - 8} cy={layout.hip.y - 28} r="7" fill={INK} /> : null}
        {pose === "breath" ? (
          <path
            d={`M ${n(layout.hip.x - 12)} ${n(layout.hip.y - 28)} q 4 3 8 0`}
            fill="none"
            stroke={PAPER}
            strokeWidth="1.2"
          />
        ) : null}
        {pose === "rush" ? <RushLines /> : null}
      </g>
    </svg>
  );
}

function Ground({ y }: { y: number }) {
  return (
    <g stroke={INK} strokeWidth="1.3" strokeLinecap="round" opacity="0.85">
      <path d={`M 62 ${y + 8} H 188`} />
      <path d={`M 78 ${y + 13} H 168`} />
      <path d={`M 96 ${y + 17} H 150`} />
    </g>
  );
}

function Wall() {
  return (
    <g>
      <rect x="16" y="28" width="16" height="250" fill={INK} />
      <g stroke={PAPER} strokeWidth="1" opacity="0.7">
        <path d="M 20 40 V 260" />
        <path d="M 24 48 V 250" />
        <path d="M 28 40 V 260" />
      </g>
    </g>
  );
}

function Staff() {
  return (
    <g>
      <rect x="30" y="48" width="10" height="224" rx="2" fill={INK} />
      <path d="M 33 60 V 250" stroke={PAPER} strokeWidth="0.8" opacity="0.6" />
    </g>
  );
}

function Chair({ chair }: { chair: { x: number; y: number; w: number; h: number } }) {
  return (
    <g fill={INK}>
      <rect x={chair.x + 6} y={chair.y - 78} width="8" height="78" />
      <rect x={chair.x + chair.w - 14} y={chair.y - 78} width="8" height="78" />
      <rect x={chair.x} y={chair.y} width={chair.w} height="10" />
      <rect x={chair.x + 8} y={chair.y + 10} width="7" height="72" />
      <rect x={chair.x + chair.w - 15} y={chair.y + 10} width="7" height="72" />
      <path
        d={`M ${chair.x + 12} ${chair.y - 70} H ${chair.x + chair.w - 18}`}
        stroke={PAPER}
        strokeWidth="1.2"
      />
      <path
        d={`M ${chair.x + 12} ${chair.y - 62} H ${chair.x + chair.w - 18}`}
        stroke={PAPER}
        strokeWidth="1.2"
      />
    </g>
  );
}

function Hair({
  head,
  angle,
  side,
  scale,
  style,
}: {
  head: Pt;
  angle: number;
  side: number;
  scale: number;
  style: "long" | "tied" | "bun";
}) {
  const size = style === "long" ? scale : style === "tied" ? scale * 0.72 : scale * 0.5;
  return (
    <g transform={`translate(${n(head.x)} ${n(head.y)}) rotate(${n(angle)}) scale(${side * size} ${size})`}>
      {style === "bun" ? (
        <g fill={INK}>
          <circle cx="12" cy="-10" r="11" />
          <path d="M -8 -4 C 0 -18 16 -16 18 -4" fill="none" stroke={PAPER} strokeWidth="1.1" />
        </g>
      ) : (
        <g fill={INK}>
          <path d="M -6 4 C 10 -16 48 -18 86 2 C 104 16 92 34 64 28 C 84 14 52 6 22 8 C 10 -2 -4 -4 -6 4 Z" />
          {style === "long" ? (
            <path d="M 70 10 C 96 -2 112 20 90 30 C 104 18 98 6 78 10 Z" />
          ) : null}
          <g fill="none" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round">
            <path d="M 8 -6 C 28 -14 48 -8 58 4" />
            <path d="M 20 8 C 40 2 58 12 66 22" />
            <path d="M 36 -8 C 56 -16 74 0 70 12" />
            <path d="M 62 6 C 80 0 92 14 82 22" />
          </g>
        </g>
      )}
    </g>
  );
}

function Garment({
  neck,
  hip,
  shoulderL,
  shoulderR,
  elbowL,
  elbowR,
  handL,
  handR,
  kneeL,
  kneeR,
  footL,
  footR,
  pattern,
  sari,
}: {
  neck: Pt;
  hip: Pt;
  shoulderL: Pt;
  shoulderR: Pt;
  elbowL: Pt;
  elbowR: Pt;
  handL: Pt;
  handR: Pt;
  kneeL: Pt;
  kneeR: Pt;
  footL: Pt;
  footR: Pt;
  pattern: number;
  sari: boolean;
}) {
  const midHip = { x: (neck.x + hip.x) / 2, y: (neck.y + hip.y) / 2 };
  return (
    <g fill="none" stroke={PAPER} strokeWidth="2.4" strokeLinecap="round">
      <path d={`M ${n(shoulderL.x)} ${n(shoulderL.y + 6)} Q ${n(neck.x)} ${n(neck.y + 10)} ${n(shoulderR.x)} ${n(shoulderR.y + 6)}`} strokeWidth="2.8" />
      <path d={curve(hip, kneeL, footL)} strokeWidth="2" />
      <path d={curve(hip, kneeR, footR)} strokeWidth="2" />
      {sari ? (
        <path d={`M ${n(shoulderL.x + 4)} ${n(shoulderL.y)} Q ${n(hip.x - 16)} ${n(midHip.y)} ${n(hip.x - 6)} ${n(hip.y)}`} />
      ) : (
        <path d={`M ${n(neck.x - 8)} ${n(neck.y + 16)} V ${n(hip.y - 6)}`} />
      )}
      <Motif x={midHip.x} y={midHip.y} pattern={pattern} />
      <Band a={elbowL} b={handL} />
      <Band a={elbowR} b={handR} />
      <Band a={kneeL} b={footL} />
      <Band a={kneeR} b={footR} />
      <Fingers at={handL} toward={elbowL} />
      <Fingers at={handR} toward={elbowR} />
    </g>
  );
}

function Motif({ x, y, pattern }: { x: number; y: number; pattern: number }) {
  if (pattern % 2 === 0) {
    return <path d={`M ${n(x)} ${n(y - 8)} l 5 8 l -5 8 l -5 -8 Z`} />;
  }
  return <circle cx={n(x)} cy={n(y)} r="5" />;
}

function Band({ a, b }: { a: Pt; b: Pt }) {
  const at = { x: a.x * 0.35 + b.x * 0.65, y: a.y * 0.35 + b.y * 0.65 };
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * 7;
  const py = (dx / len) * 7;
  return <path d={`M ${n(at.x - px)} ${n(at.y - py)} L ${n(at.x + px)} ${n(at.y + py)}`} strokeWidth="2.6" />;
}

function Fingers({ at, toward }: { at: Pt; toward: Pt }) {
  const dx = at.x - toward.x;
  const dy = at.y - toward.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = (dx / len) * 7;
  const uy = (dy / len) * 7;
  const px = (-dy / len) * 3.2;
  const py = (dx / len) * 3.2;
  return (
    <g strokeWidth="1">
      <path d={`M ${n(at.x - px)} ${n(at.y - py)} l ${n(ux)} ${n(uy)}`} />
      <path d={`M ${n(at.x)} ${n(at.y)} l ${n(ux)} ${n(uy)}`} />
      <path d={`M ${n(at.x + px)} ${n(at.y + py)} l ${n(ux)} ${n(uy)}`} />
    </g>
  );
}

function Face({ head, pose }: { head: Pt; pose: Pose }) {
  const held = pose === "breathHold";
  return (
    <g>
      <ellipse cx={head.x} cy={head.y - 1} rx={held ? 10 : 8.6} ry="11" fill={PAPER} />
      <g fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
        <path d={`M ${n(head.x - 5)} ${n(head.y - 3)} q 2.2 -2.4 4.2 0`} />
        <path d={`M ${n(head.x + 1.4)} ${n(head.y - 3)} q 2.2 -2.4 4.2 0`} />
        <path d={`M ${n(head.x + 0.4)} ${n(head.y - 1)} q 1.2 3 0.2 5`} />
        <path d={`M ${n(head.x - 2)} ${n(head.y + 6)} q 2.4 1.6 4.6 0`} />
      </g>
      {held ? <circle cx={head.x - 7} cy={head.y + 2} r="2.2" fill="none" stroke={INK} strokeWidth="1" /> : null}
      <path d={`M ${n(head.x - 9)} ${n(head.y + 2)} q -2 4 -1 7`} fill="none" stroke={INK} strokeWidth="1.3" />
      <circle cx={head.x - 11} cy={head.y + 10} r="1.3" fill={INK} />
    </g>
  );
}

function RushLines() {
  return (
    <g stroke={INK} strokeWidth="1.6" strokeLinecap="round">
      <path d="M 28 118 H 58" />
      <path d="M 22 136 H 54" />
      <path d="M 34 154 H 60" />
    </g>
  );
}
