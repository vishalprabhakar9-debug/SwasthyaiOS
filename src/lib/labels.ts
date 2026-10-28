import type { Activity, AgeBand, BodyArea, Effort, Goal, Level, Limitation, Pillar, Position } from "@/lib/types";

export const pillarLabel: Record<Pillar, string> = {
  strength: "Strength",
  mobility: "Mobility",
  balance: "Balance",
  flexibility: "Flexibility",
  endurance: "Endurance",
  recovery: "Recovery & Breath",
};

export const pillarSummary: Record<Pillar, string> = {
  strength: "Functional bodyweight strength for daily tasks.",
  mobility: "Comfortable movement through the joints you use.",
  balance: "Steadiness and awareness of where your body is.",
  flexibility: "Useful range of motion, without forcing a pose.",
  endurance: "Stamina for walking, chores, and longer practice.",
  recovery: "Slower breathing and movement that lets you settle.",
};

export const levelLabel: Record<Level, string> = {
  gentle: "Gentle",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export const positionLabel: Record<Position, string> = {
  standing: "Standing",
  seated: "Seated",
  floor: "Floor",
  chair: "Chair-supported",
};

export const areaLabel: Record<BodyArea, string> = {
  full: "Full body",
  back: "Back",
  shoulders: "Shoulders",
  hips: "Hips",
  knees: "Knees",
  legs: "Legs",
  core: "Core",
  ankles: "Ankles",
  wrists: "Wrists",
  neck: "Neck",
};

export const ageLabel: Record<AgeBand, string> = {
  "18-29": "18–29",
  "30-39": "30–39",
  "40-49": "40–49",
  "50-59": "50–59",
  "60-69": "60–69",
  "70-79": "70–79",
  "80+": "80+",
};

export const ageEmphasis: Record<AgeBand, string> = {
  "18-29": "Strength, endurance, athletic movement, and mobility can share the focus.",
  "30-39": "Functional strength, mobility, posture, and steady cardiovascular work fit well.",
  "40-49": "Joint mobility, strength you can keep, flexibility, balance, and recovery matter here.",
  "50-59": "Functional strength, balance, joint-friendly conditioning, and mobility are useful companions.",
  "60-69": "Balance, mobility, unhurried strength, posture, and walking capacity are practical priorities.",
  "70-79": "Gentle mobility, chair-supported options, balance with support, and breathing leave room to move well.",
  "80+": "The aim is comfortable movement, supported balance, flexibility, and the strength daily life asks for.",
};

export const activityLabel: Record<Activity, string> = {
  sedentary: "Sedentary",
  light: "Lightly active",
  moderate: "Moderately active",
  very: "Very active",
};

export const goalLabel: Record<Goal, string> = {
  move: "Move better",
  flexibility: "Improve flexibility",
  strength: "Improve strength",
  balance: "Improve balance",
  stamina: "Improve stamina",
  stiffness: "Reduce stiffness",
  posture: "Improve posture",
  age: "Stay active with age",
  independence: "Maintain independence",
  tradition: "Learn traditional Indian exercises",
};

export const limitationLabel: Record<Limitation, string> = {
  knee: "Knee discomfort",
  back: "Back discomfort",
  shoulder: "Shoulder discomfort",
  balance: "Balance difficulty",
  heart: "Heart condition",
  surgery: "Recent surgery",
  osteoporosis: "Osteoporosis",
  none: "None of these",
  other: "Something else",
};

export const effortLabel: Record<Effort, string> = {
  "very-easy": "Very easy",
  comfortable: "Comfortable",
  moderate: "Moderate",
  challenging: "Challenging",
  "too-difficult": "Too difficult",
};

export const categoryLabel: Record<string, string> = {
  "surya-namaskar": "Surya Namaskar",
  dand: "Dand",
  baithak: "Baithak",
  "yoga-mobility": "Yoga mobility",
  functional: "Functional movement",
  balance: "Balance",
  recovery: "Recovery & breath",
};
