import type {
  AvoidFrame,
  BodyArea,
  Exercise,
  Frame,
  Level,
  Pillar,
  Pose,
  Position,
  Variation,
  VariationFlags,
} from "@/lib/types";

export function frame(pose: Pose, label: string, description: string, arrow?: Frame["arrow"]): Frame {
  return { pose, label, description, arrow };
}

export function variation(input: {
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
  positions: Position[];
  floorRequired?: boolean;
  chairSupported?: boolean;
  flags?: VariationFlags;
}): Variation {
  return {
    floorRequired: false,
    chairSupported: false,
    ...input,
  };
}

export function exercise(
  input: Omit<Exercise, "equipment" | "floorRequired" | "chairSupported" | "positions"> & {
    variations: Variation[];
  },
): Exercise {
  const positions = [...new Set(input.variations.flatMap((item) => item.positions))];
  return {
    ...input,
    equipment: "none",
    positions,
    floorRequired: input.variations.every((item) => item.floorRequired),
    chairSupported: input.variations.some((item) => item.chairSupported),
  };
}

export const pillars = (...items: Pillar[]) => items;
export const areas = (...items: BodyArea[]) => items;
