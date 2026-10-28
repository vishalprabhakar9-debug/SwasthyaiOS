import type { Metadata } from "next";
import { ProgressDashboard } from "@/components/progress-dashboard";

export const metadata: Metadata = { title: "Progress" };

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Progress</h1>
      <p>A quiet record of the sessions on this device. Missing a day is not a failure.</p>
      <ProgressDashboard />
    </div>
  );
}
