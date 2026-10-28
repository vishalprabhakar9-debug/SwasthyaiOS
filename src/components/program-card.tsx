import Link from "next/link";
import type { Program } from "@/lib/types";

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link href={`/programs/${program.slug}`} className="flex h-full flex-col rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-border">
      <p className="text-sm font-medium tracking-wide text-terracotta uppercase">{program.duration}</p>
      <h3 className="mt-2 font-heading text-2xl">{program.name}</h3>
      <p className="mt-2 flex-1">{program.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {program.focus.map((item) => (
          <li key={item} className="rounded-full bg-accent px-3 py-1">
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}
