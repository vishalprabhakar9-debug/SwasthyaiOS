import { brand } from "@/config/brand";

export const stopSymptoms = [
  "chest pain",
  "severe dizziness",
  "fainting",
  "unusual shortness of breath",
  "sudden severe pain",
] as const;

export const siteDisclaimer = `${brand.name} offers general movement education for adults. It does not diagnose, treat, or cure any condition. Regular physical activity may support overall health. Movement can help maintain mobility and functional capacity. Stop if you feel chest pain, severe dizziness, fainting, unusual shortness of breath, or sudden severe pain, and seek medical care.`;

export const consultNotice =
  "You mentioned a heart condition, recent surgery, or osteoporosis. Vigorous exercise should be discussed with a qualified health professional first. This suggestion stays with gentle movement and is not a medical clearance.";

export const personalizationOffNote =
  "Personalization is off, so this plan is a general beginner template. It does not use your age, goals, or health answers.";

export const observationDisclaimer =
  "These notes describe what you reported about movement. They are not a diagnosis, a score, or a medical test.";
