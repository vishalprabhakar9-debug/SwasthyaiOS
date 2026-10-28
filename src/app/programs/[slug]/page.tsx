import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExercise } from "@/content/exercises";
import { getProgram, programs } from "@/content/programs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getProgram(slug)?.name ?? "Program" };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  const floor = program.floor === "no" ? "no" : "yes";
  return (
    <article className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <h1 className="font-heading text-5xl">{program.name}</h1>
      <p className="text-xl">{program.summary}</p>
      <p>{program.ageNote}</p>
      <p className="text-stone">{program.duration}</p>
      <ol className="list-decimal space-y-3 pl-5">
        {program.exerciseSlugs.map((item) => {
          const exercise = getExercise(item);
          if (!exercise) return null;
          return (
            <li key={item}>
              <Link href={`/exercises/${exercise.slug}`} className="underline">
                {exercise.name}
              </Link>
              <span className="text-stone"> — {exercise.summary}</span>
            </li>
          );
        })}
      </ol>
      <Link
        href={`/routine?program=${program.slug}&minutes=20&preset=${program.preset}&floor=${floor}`}
        className={cn(buttonVariants({ size: "lg" }))}
      >
        Make this my session
      </Link>
    </article>
  );
}
