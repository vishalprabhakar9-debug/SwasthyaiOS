import type { Metadata } from "next";
import { programs } from "@/content/programs";
import { ProgramCard } from "@/components/program-card";

export const metadata: Metadata = { title: "Programs" };

export default function ProgramsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-5xl">Programs</h1>
      <p className="max-w-3xl">
        Five practices, each with room to change the floor, the support, and the intensity. A program is a starting set, not a command.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {programs.map((program) => (
          <ProgramCard key={program.slug} program={program} />
        ))}
      </div>
    </div>
  );
}
