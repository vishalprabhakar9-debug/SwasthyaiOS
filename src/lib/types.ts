export const PILLARS = [
  "strength",
  "mobility",
  "balance",
  "flexibility",
  "endurance",
  "recovery",
] as const;
export type Pillar = (typeof PILLARS)[number];

export const LEVELS = ["gentle", "beginner", "intermediate", "advanced"] as const;
export type Level = (typeof LEVELS)[number];

export const POSITIONS = ["standing", "seated", "floor", "chair"] as const;
export type Position = (typeof POSITIONS)[number];

export const BODY_AREAS = [
  "full",
  "back",
  "shoulders",
  "hips",
  "knees",
  "legs",
  "core",
  "ankles",
  "wrists",
  "neck",
] as const;
export type BodyArea = (typeof BODY_AREAS)[number];

export const AGE_BANDS = ["18-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80+"] as const;
export type AgeBand = (typeof AGE_BANDS)[number];

export const ACTIVITIES = ["sedentary", "light", "moderate", "very"] as const;
export type Activity = (typeof ACTIVITIES)[number];

export const GOALS = [
  "move",
  "flexibility",
  "strength",
  "balance",
  "stamina",
  "stiffness",
  "posture",
  "age",
  "independence",
  "tradition",
] as const;
export type Goal = (typeof GOALS)[number];

export const LIMITATIONS = [
  "knee",
  "back",
  "shoulder",
  "balance",
  "heart",
  "surgery",
  "osteoporosis",
  "none",
  "other",
] as const;
export type Limitation = (typeof LIMITATIONS)[number];

export const EFFORTS = ["very-easy", "comfortable", "moderate", "challenging", "too-difficult"] as const;
export type Effort = (typeof EFFORTS)[number];

export const POSES = [
  "stand",
  "armRaise",
  "forwardFold",
  "partialSquat",
  "baithak",
  "chairSit",
  "chairRise",
  "wallDand",
  "dand",
  "dandLow",
  "kneel",
  "lunge",
  "downDog",
  "cobra",
  "child",
  "cat",
  "cow",
  "bridge",
  "tree",
  "triangle",
  "birdDog",
  "march",
  "tandem",
  "singleLeg",
  "breath",
  "sideBend",
  "kneeRaise",
  "calf",
  "walk",
  "floorSit",
  "spinalTwist",
  "ankle",
  "shoulderOpen",
  "hipOpen",
  "neckTurn",
  "wristFlex",
  "kneesIn",
  "roundedBack",
  "forcedReach",
  "breathHold",
  "rush",
] as const;
export type Pose = (typeof POSES)[number];

export type Generation = "20s" | "30s" | "40s" | "50s" | "60s" | "70s";
export type Presentation = "a" | "b";
export type BodyWidth = "narrow" | "medium" | "broad";

export interface Appearance {
  tone: 0 | 1 | 2 | 3;
  generation: Generation;
  presentation: Presentation;
  width: BodyWidth;
}

export interface Frame {
  pose: Pose;
  label: string;
  description: string;
  arrow?: "down" | "up" | "side" | "rotate";
}

export interface VariationFlags {
  deepSquat?: boolean;
  overhead?: boolean;
  loadedFlexion?: boolean;
  vigorous?: boolean;
  balanceChallenge?: boolean;
}

export interface AvoidFrame {
  caption: string;
  pose: Pose;
  description: string;
}

export interface Variation {
  level: Level;
  name: string;
  summary: string;
  steps: string[];
  breathing: string;
  reps: string;
  duration: string;
  rest: string;
  sequence: Frame[];
  goodForm: string[];
  avoid: AvoidFrame[];
  floorRequired: boolean;
  chairSupported: boolean;
  positions: Position[];
  flags?: VariationFlags;
  /** Reserved for a future narration file. The on-screen steps are the script. */
  audioSrc?: string;
}

export interface Exercise {
  slug: string;
  name: string;
  traditionalName?: string;
  category: string;
  summary: string;
  context: string;
  purpose: string;
  pillars: Pillar[];
  bodyAreas: BodyArea[];
  positions: Position[];
  floorRequired: boolean;
  chairSupported: boolean;
  equipment: "none";
  ageGuidance: string;
  muscles: string[];
  benefits: string[];
  precautions: string[];
  commonMistakes: string[];
  breathing: string;
  durationMinutes: number;
  variations: Variation[];
  searchTerms: string[];
}

export interface Program {
  slug: string;
  name: string;
  summary: string;
  focus: string[];
  duration: string;
  exerciseSlugs: string[];
  ageNote: string;
  floor: "optional" | "no" | "yes";
  preset: "starter" | "mobility" | "ageing" | "balance" | "nofloor";
}

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface ArticleReference {
  title: string;
  note: string;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: ArticleSection[];
  references: ArticleReference[];
}

export interface Abilities {
  walk20: boolean | null;
  floorSit: boolean | null;
  floorRise: boolean | null;
  partialSquat: boolean | null;
  armsOverhead: boolean | null;
  oneLeg: boolean | null;
  wallPushup: boolean | null;
}

export interface Profile {
  ageBand: AgeBand | null;
  activity: Activity | null;
  goals: Goal[];
  abilities: Abilities;
  limitations: Limitation[];
  limitationNote: string;
  floorComfort: boolean | null;
  textSize: "normal" | "large" | "xlarge";
  easyView: boolean;
  reducedMotion: boolean;
  personalization: boolean;
  onboarded: boolean;
  effortBias: -1 | 0 | 1;
}

export interface PillarMinutes {
  strength: number;
  mobility: number;
  balance: number;
  flexibility: number;
  endurance: number;
  recovery: number;
}

export interface SessionRecord {
  id: string;
  completedAt: string;
  title: string;
  durationMinutes: number;
  exercisesCompleted: number;
  pillarMinutes: PillarMinutes;
  effort: Effort | null;
}

export interface RoutineItem {
  exerciseSlug: string;
  exerciseName: string;
  variationName: string;
  level: Level;
  pillar: Pillar;
  cue: string;
  steps: string[];
  seconds: number;
  reps: string;
  pose: Pose;
}

export interface RoutineBlock {
  id: string;
  title: string;
  pillar: Pillar;
  minutes: number;
  items: RoutineItem[];
}

export interface RoutinePlan {
  title: string;
  minutes: number;
  notice: string | null;
  omittedNote: string | null;
  blocks: RoutineBlock[];
}

export type DurationMinutes = 5 | 10 | 15 | 20 | 30 | 45;

export interface RoutineRequest {
  duration: DurationMinutes;
  intensity: Level | "auto";
  floor: boolean | null;
  balanceSupport: boolean;
  preset:
    | "break"
    | "mobility"
    | "starter"
    | "full"
    | "conditioning"
    | "complete"
    | "morning"
    | "evening"
    | null;
  programSlug: string | null;
  includeSaved: boolean;
}

export interface MovementCheck {
  chairRises: string;
  balance: string;
  overhead: string;
  floor: string;
  savedAt: string;
}
