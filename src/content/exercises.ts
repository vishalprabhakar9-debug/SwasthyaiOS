import type { Exercise } from "@/lib/types";
import { exercisesA } from "@/content/exercises-a";
import { exercisesB } from "@/content/exercises-b";
import { exercisesC } from "@/content/exercises-c";
import { exercisesD } from "@/content/exercises-d";

export const exercises: Exercise[] = [...exercisesA, ...exercisesB, ...exercisesC, ...exercisesD];

export function getExercise(slug: string) {
  return exercises.find((exercise) => exercise.slug === slug);
}

export function exercisesByCategory(category: string) {
  return exercises.filter((exercise) => exercise.category === category);
}
