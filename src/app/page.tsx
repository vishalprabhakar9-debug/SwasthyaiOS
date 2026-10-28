import Link from "next/link";
import { brand } from "@/config/brand";
import { programs } from "@/content/programs";
import { HeroScene } from "@/components/hero-scene";
import { MovementOfTheDay } from "@/components/movement-of-the-day";
import { ProgramCard } from "@/components/program-card";
import { buttonVariants } from "@/components/ui/button";
import { AGE_BANDS } from "@/lib/types";
import { ageEmphasis, ageLabel, pillarLabel, pillarSummary } from "@/lib/labels";
import { PILLARS } from "@/lib/types";
import { cn } from "cn";

const traditions = [
  ["Surya Namaskar", "A breath-led sequence with chair, slow, and flowing paths.", "/exercises?category=surya-namaskar"],
  ["Dand", "Traditional pushing patterns, from the wall to a flowing dand.", "/exercises?category=dand"],
  ["Baithak", "Squat practice that does not require a deep position.", "/exercises?category=baithak"],
  ["Yoga mobility", "Standing, seated, and floor shapes for range and posture.", "/exercises?category=yoga-mobility"],
  ["Akhara conditioning", "The training ground behind dand and baithak, explained with care.", "/learn/what-is-an-akhara"],
  ["Functional movement", "Floor transfers, walking, and the strength daily life uses.", "/exercises?category=functional"],
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-medium text-terracotta">{brand.subtitle}</p>
          <h1 className="mt-3 font-heading text-5xl text-balance md:text-6xl">Move Better. Live Stronger. The Indian Way.</h1>
          <p className="mt-4 max-w-xl text-xl">
            Discover traditional Indian bodyweight movement adapted for modern adults — from 18 to 80+.
          </p>
          <p className="mt-4 max-w-xl">
            No gym. No machines. Just your body, movement, and consistency.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/onboarding" className={cn(buttonVariants({ size: "lg" }))}>
              Create my movement plan
            </Link>
            <Link href="/exercises" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              Explore exercises
            </Link>
          </div>
        </div>
        <HeroScene />
      </section>

      <section>
        <h2 className="font-heading text-4xl">Fitness without the gym</h2>
        <p className="mt-3 max-w-3xl">
          Fitness existed long before gyms. For generations, Indian physical culture developed strength, mobility, endurance, and discipline using natural human movement. Explore these traditions through accessible, illustrated routines adapted for modern life.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link key={pillar} href={`/exercises?goal=${pillar}`} className="rounded-2xl bg-paper p-5 shadow-sm ring-1 ring-border">
              <h3 className="font-heading text-2xl text-forest">{pillarLabel[pillar]}</h3>
              <p className="mt-2">{pillarSummary[pillar]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-4xl">Explore traditional Indian movement</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {traditions.map(([title, copy, href]) => (
            <Link key={title} href={href} className="rounded-2xl bg-paper p-5 ring-1 ring-border">
              <h3 className="font-heading text-2xl">{title}</h3>
              <p className="mt-2">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-4xl">Movement for every stage of life</h2>
        <p className="mt-3 max-w-3xl">
          Movement has no retirement age. Whether you are 28 or 78, the goal is not to move like someone younger. The goal is to keep moving well for your stage of life.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AGE_BANDS.map((age) => (
            <Link key={age} href={`/exercises?age=${age}`} className="rounded-2xl bg-accent/70 p-4">
              <h3 className="font-heading text-2xl">{ageLabel[age]}</h3>
              <p className="mt-2">{ageEmphasis[age]}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-4xl">Start with just 10 minutes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["5 min", "Movement Break", "/routine?minutes=5&preset=break"],
            ["10 min", "Daily Mobility", "/routine?minutes=10&preset=mobility"],
            ["15 min", "Indian Bodyweight Starter", "/routine?minutes=15&preset=starter"],
          ].map(([time, name, href]) => (
            <Link key={name} href={href} className="rounded-2xl bg-forest p-5 text-white">
              <p className="text-sm uppercase tracking-wide text-[#d7efe6]">{time}</p>
              <h3 className="mt-2 font-heading text-3xl">{name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <MovementOfTheDay />

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-heading text-4xl">Healthy ageing</h2>
          <p className="mt-3">
            Keeping mobility, strength, balance, and regular activity can support functional independence. That is not a promise to prevent disease. It is a practical reason to keep moving, with paths that fit the body you have today.
          </p>
          <Link href="/ageing" className={cn(buttonVariants({ size: "lg" }), "mt-4")}>
            Visit the ageing hub
          </Link>
        </div>
        <div className="grid gap-4">
          {programs.slice(2, 4).map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </section>
    </div>
  );
}
