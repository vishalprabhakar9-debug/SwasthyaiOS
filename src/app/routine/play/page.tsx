import type { Metadata } from "next";
import { RoutinePlayer } from "@/components/routine-player";

export const metadata: Metadata = { title: "Practice" };

export default function PlayPage() {
  return <RoutinePlayer />;
}
