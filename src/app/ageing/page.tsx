import type { Metadata } from "next";
import Link from "next/link";
import { MovementSelfCheck } from "@/components/movement-self-check";
import { AGE_BANDS } from "@/lib/types";
import { ageLabel } from "@/lib/labels";

export const metadata: Metadata = { title: "Healthy ageing" };

const topics = [
  ["Why strength matters with age", "Legs and arms that can still push, stand, and carry make daily tasks more available. Strength work can be a chair rise."],
  ["Mobility and independence", "Comfortable joints make reaching, turning, and walking less of a negotiation. Range is useful when it serves your day."],
  ["Balance training", "Practice near a chair. Steadiness is a skill you can rehearse. It is not a test of whether you are capable."],
  ["Maintaining leg strength", "Sit-to-stand and a partial baithak keep the muscles that get you out of a seat."],
  ["Floor-to-standing ability", "When the floor is appropriate, practice a slow path down and up. When it is not, the chair remains a complete practice."],
  ["Daily walking", "An easy walk is endurance. It does not need to be fast to count."],
  ["Posture", "Tall standing, soft knees, and a quiet jaw are enough. Posture is not a frozen position."],
  ["Joint-friendly movement", "Shorter ranges, support, and smooth tempo respect knees, backs, and shoulders."],
  ["Recovery", "Breathing and unhurried mobility close a session. Rest is part of training."],
  ["Sleep", "Movement earlier in the day can sit comfortably beside a regular sleep habit. This site does not treat sleep disorders."],
];

export default function AgeingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <header>
        <h1 className="font-heading text-5xl">Healthy ageing</h1>
        <p className="mt-3 text-xl">
          Adults in their fifties, sixties, seventies, and eighties are the audience for this section, not a footnote. The tone here is practical and respectful.
        </p>
      </header>
      <p>
        Maintaining mobility, strength, balance, and regular activity can support functional independence. Swasthya does not claim that exercise prevents or treats disease. If something about your health has changed suddenly, speak with a qualified clinician before vigorous practice.
      </p>
      <div className="space-y-4">
        {topics.map(([title, body]) => (
          <section key={title} className="rounded-2xl bg-paper p-4 ring-1 ring-border">
            <h2 className="font-heading text-2xl">{title}</h2>
            <p className="mt-2">{body}</p>
          </section>
        ))}
      </div>
      <section>
        <h2 className="font-heading text-3xl">Start from an age emphasis</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {AGE_BANDS.filter((age) => ["50-59", "60-69", "70-79", "80+"].includes(age)).map((age) => (
            <Link key={age} href={`/exercises?age=${age}`} className="min-h-11 rounded-full bg-accent px-4 py-2">
              {ageLabel[age]}
            </Link>
          ))}
        </div>
      </section>
      <p>
        <Link href="/programs/better-balance" className="underline">
          Better Balance
        </Link>{" "}
        and the{" "}
        <Link href="/programs/no-floor-routine" className="underline">
          No-Floor Routine
        </Link>{" "}
        are ready when you want a plan rather than a single exercise.
      </p>
      <MovementSelfCheck />
    </div>
  );
}
