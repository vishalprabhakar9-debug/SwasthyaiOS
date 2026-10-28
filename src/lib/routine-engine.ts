import { exercises } from "@/content/exercises";
import { getProgram } from "@/content/programs";
import { consultNotice, personalizationOffNote } from "@/content/safety";
import type {
  AgeBand,
  DurationMinutes,
  Exercise,
  Goal,
  Level,
  Pillar,
  Profile,
  RoutineBlock,
  RoutineItem,
  RoutinePlan,
  RoutineRequest,
  Variation,
} from "@/lib/types";
import { LEVELS } from "@/lib/types";

const rank: Record<Level, number> = { gentle: 0, beginner: 1, intermediate: 2, advanced: 3 };

const ageFocus: Record<AgeBand, Pillar[]> = {
  "18-29": ["strength", "endurance", "mobility"],
  "30-39": ["strength", "mobility", "endurance"],
  "40-49": ["mobility", "flexibility", "balance", "recovery"],
  "50-59": ["strength", "balance", "mobility"],
  "60-69": ["balance", "mobility", "strength"],
  "70-79": ["mobility", "balance", "recovery"],
  "80+": ["mobility", "balance", "recovery", "flexibility"],
};

const goalPillar: Record<Goal, Pillar> = {
  move: "mobility",
  flexibility: "flexibility",
  strength: "strength",
  balance: "balance",
  stamina: "endurance",
  stiffness: "mobility",
  posture: "mobility",
  age: "balance",
  independence: "strength",
  tradition: "strength",
};

export function needsConsult(profile: Profile) {
  return (
    profile.personalization &&
    profile.limitations.some((item) => item === "heart" || item === "surgery" || item === "osteoporosis")
  );
}

function stepLevel(level: Level, direction: -1 | 1): Level {
  return LEVELS[Math.min(3, Math.max(0, rank[level] + direction))];
}

export function resolveLevel(profile: Profile, request: RoutineRequest): Level {
  if (!profile.personalization) {
    const chosen = request.intensity === "auto" ? "beginner" : request.intensity;
    return profile.easyView && rank[chosen] > 1 ? "beginner" : chosen;
  }
  if (needsConsult(profile)) return "gentle";
  let level: Level = "beginner";
  if (profile.activity === "sedentary" || profile.activity === "light") level = "gentle";
  if (profile.activity === "moderate") level = "beginner";
  if (profile.activity === "very") level = "intermediate";
  if (profile.ageBand === "60-69" && rank[level] > 1) level = "beginner";
  if ((profile.ageBand === "70-79" || profile.ageBand === "80+") && profile.activity !== "very") level = "gentle";
  if (profile.effortBias < 0) level = stepLevel(level, -1);
  if (profile.effortBias > 0) level = stepLevel(level, 1);
  if (request.intensity !== "auto") level = request.intensity;
  if (needsConsult(profile)) level = "gentle";
  if (profile.easyView && rank[level] > 1) level = "beginner";
  return level;
}

interface EngineContext {
  level: Level;
  floor: boolean;
  supportBalance: boolean;
  easyView: boolean;
  profile: Profile;
  medical: boolean;
}

function allowed(variation: Variation, ctx: EngineContext) {
  if (variation.floorRequired && !ctx.floor) return false;
  if (ctx.medical && (variation.level !== "gentle" || variation.flags?.vigorous)) return false;
  if (rank[variation.level] > rank[ctx.level]) return false;
  if (!ctx.profile.personalization) return true;
  const limits = ctx.profile.limitations;
  if (limits.includes("knee") && variation.flags?.deepSquat) return false;
  if (limits.includes("back") && variation.flags?.loadedFlexion) return false;
  if ((limits.includes("shoulder") || ctx.profile.abilities.armsOverhead === false) && variation.flags?.overhead) return false;
  if (ctx.profile.abilities.partialSquat === false && variation.flags?.deepSquat) return false;
  const unsteady =
    ctx.supportBalance || limits.includes("balance") || ctx.profile.abilities.oneLeg === false;
  if (unsteady && variation.flags?.balanceChallenge && !variation.chairSupported) return false;
  return true;
}

function pickVariation(exercise: Exercise, ctx: EngineContext) {
  const eligible = exercise.variations.filter((item) => allowed(item, ctx)).sort((a, b) => rank[b.level] - rank[a.level]);
  if (!eligible.length) return null;
  let chosen = eligible[0];
  if ((ctx.supportBalance || ctx.easyView) && !chosen.chairSupported) {
    const chair = eligible.find((item) => item.chairSupported);
    if (chair) chosen = chair;
  }
  return chosen;
}

function score(exercise: Exercise, pillar: Pillar, profile: Profile) {
  let value = exercise.pillars.includes(pillar) ? 5 : 0;
  if (!profile.personalization) return value;
  if (profile.goals.some((goal) => exercise.pillars.includes(goalPillar[goal]))) value += 3;
  if (profile.ageBand && ageFocus[profile.ageBand].some((focus) => exercise.pillars.includes(focus))) value += 2;
  if (profile.goals.includes("tradition") && ["dand", "baithak", "surya-namaskar"].includes(exercise.category)) value += 2;
  return value;
}

function blockPlan(request: RoutineRequest): { id: string; title: string; pillar: Pillar; minutes: number }[] {
  if (request.preset === "evening") {
    return [
      { id: "mobility", title: "Easy mobility", pillar: "mobility", minutes: Math.max(3, request.duration - 3) },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: Math.min(3, request.duration) },
    ];
  }
  if (request.preset === "morning" || request.preset === "mobility" || request.preset === "break") {
    if (request.duration <= 5) {
      return [
        { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 3 },
        { id: "breath", title: "Breathing", pillar: "recovery", minutes: 2 },
      ];
    }
    return [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: Math.round(request.duration * 0.7) },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: request.duration - Math.round(request.duration * 0.7) },
    ];
  }
  const plans: Record<DurationMinutes, { id: string; title: string; pillar: Pillar; minutes: number }[]> = {
    5: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 3 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 2 },
    ],
    10: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 4 },
      { id: "main", title: "Main practice", pillar: "mobility", minutes: 4 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 2 },
    ],
    15: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 4 },
      { id: "strength", title: "Strength", pillar: "strength", minutes: 6 },
      { id: "mobility", title: "Mobility", pillar: "mobility", minutes: 3 },
      { id: "balance", title: "Balance", pillar: "balance", minutes: 1 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 1 },
    ],
    20: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 4 },
      { id: "strength", title: "Strength", pillar: "strength", minutes: 7 },
      { id: "mobility", title: "Mobility", pillar: "mobility", minutes: 5 },
      { id: "balance", title: "Balance", pillar: "balance", minutes: 2 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 2 },
    ],
    30: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 5 },
      { id: "strength", title: "Strength", pillar: "strength", minutes: 12 },
      { id: "mobility", title: "Mobility", pillar: "flexibility", minutes: 6 },
      { id: "balance", title: "Balance", pillar: "balance", minutes: 4 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 3 },
    ],
    45: [
      { id: "warm", title: "Warm-up", pillar: "mobility", minutes: 6 },
      { id: "strength", title: "Strength", pillar: "strength", minutes: 18 },
      { id: "mobility", title: "Mobility", pillar: "flexibility", minutes: 10 },
      { id: "balance", title: "Balance", pillar: "endurance", minutes: 6 },
      { id: "breath", title: "Breathing", pillar: "recovery", minutes: 5 },
    ],
  };
  return plans[request.duration];
}

function titles(request: RoutineRequest) {
  const presetTitles: Record<NonNullable<RoutineRequest["preset"]>, string> = {
    break: "Movement Break",
    mobility: "Daily Mobility",
    starter: "Indian Bodyweight Starter",
    full: "Full Body Movement",
    conditioning: "Traditional Conditioning",
    complete: "Complete Indian Movement Practice",
    morning: "Morning Mobility",
    evening: "Evening Recovery",
  };
  if (request.programSlug) return getProgram(request.programSlug)?.name ?? "Program practice";
  if (request.preset) return presetTitles[request.preset];
  return `Your ${request.duration}-minute movement routine`;
}

export function buildRoutine(profile: Profile, request: RoutineRequest, savedSlugs: string[] = []): RoutinePlan {
  const medical = needsConsult(profile);
  const floor =
    request.floor === null
      ? profile.personalization
        ? profile.floorComfort !== false
        : true
      : request.floor;
  const ctx: EngineContext = {
    level: resolveLevel(profile, request),
    floor,
    supportBalance:
      request.balanceSupport ||
      profile.easyView ||
      (profile.personalization &&
        (profile.limitations.includes("balance") || profile.abilities.oneLeg === false)),
    easyView: profile.easyView,
    profile,
    medical,
  };
  const program = request.programSlug ? getProgram(request.programSlug) : undefined;
  const preferred = new Set([...(program?.exerciseSlugs ?? []), ...(request.includeSaved ? savedSlugs : [])]);
  const used = new Set<string>();
  const blocks: RoutineBlock[] = [];

  for (const spec of blockPlan(request)) {
    const count = Math.max(1, Math.round(spec.minutes / 2.5));
    let pool = exercises
      .map((exercise) => ({ exercise, variation: pickVariation(exercise, ctx) }))
      .filter((item): item is { exercise: Exercise; variation: Variation } => {
        if (!item.variation || used.has(item.exercise.slug)) return false;
        return item.exercise.pillars.includes(spec.pillar) || item.exercise.pillars.includes("mobility");
      });
    const preferredPool = pool.filter((item) => preferred.has(item.exercise.slug) && item.exercise.pillars.includes(spec.pillar));
    if (preferredPool.length) pool = preferredPool;
    else pool = pool.filter((item) => item.exercise.pillars.includes(spec.pillar));

    if (
      spec.pillar === "strength" &&
      (request.preset === "starter" ||
        request.preset === "full" ||
        request.preset === "conditioning" ||
        request.preset === "complete" ||
        request.duration >= 30)
    ) {
      const order = ["basic-baithak", "supported-baithak", "gentle-squat", "traditional-dand", "modified-dand", "wall-dand"];
      pool.sort((a, b) => {
        const ai = order.indexOf(a.exercise.slug);
        const bi = order.indexOf(b.exercise.slug);
        return (ai === -1 ? 20 : ai) - (bi === -1 ? 20 : bi);
      });
    } else {
      pool.sort((a, b) => score(b.exercise, spec.pillar, profile) - score(a.exercise, spec.pillar, profile));
    }

    const picked = pool.slice(0, count);
    if (!picked.length) continue;
    const seconds = Math.max(40, Math.round((spec.minutes * 60) / picked.length));
    const items: RoutineItem[] = picked.map(({ exercise, variation }) => {
      used.add(exercise.slug);
      return {
        exerciseSlug: exercise.slug,
        exerciseName: exercise.name,
        variationName: variation.name,
        level: variation.level,
        pillar: exercise.pillars.includes(spec.pillar) ? spec.pillar : exercise.pillars[0],
        cue: variation.steps[0] ?? exercise.summary,
        steps: variation.steps,
        seconds,
        reps: variation.reps,
        pose: variation.sequence[0]?.pose ?? "stand",
      };
    });
    blocks.push({ id: spec.id, title: spec.title, pillar: spec.pillar, minutes: spec.minutes, items });
  }

  const skipped = program ? program.exerciseSlugs.filter((slug) => !used.has(slug)) : [];
  const notes = [
    profile.personalization ? null : personalizationOffNote,
    skipped.length ? "Some program movements were left out so the plan could match your floor, support, and comfort settings." : null,
  ].filter(Boolean);

  return {
    title: titles(request),
    minutes: request.duration,
    notice: medical ? consultNotice : null,
    omittedNote: notes.length ? notes.join(" ") : null,
    blocks,
  };
}

export const durationOptions: { minutes: DurationMinutes; name: string; preset: RoutineRequest["preset"] }[] = [
  { minutes: 5, name: "Movement Break", preset: "break" },
  { minutes: 10, name: "Daily Mobility", preset: "mobility" },
  { minutes: 15, name: "Indian Bodyweight Starter", preset: "starter" },
  { minutes: 20, name: "Full Body Movement", preset: "full" },
  { minutes: 30, name: "Traditional Conditioning", preset: "conditioning" },
  { minutes: 45, name: "Complete Indian Movement Practice", preset: "complete" },
];
