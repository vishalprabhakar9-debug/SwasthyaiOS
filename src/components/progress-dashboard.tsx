"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadSessions } from "@/lib/storage";
import type { SessionRecord } from "@/lib/types";
import { effortLabel, pillarLabel } from "@/lib/labels";
import type { Pillar } from "@/lib/types";

export function ProgressDashboard() {
  const [ready, setReady] = useState(false);
  const [sessions, setSessions] = useState<SessionRecord[]>([]);

  useEffect(() => {
    setSessions(loadSessions());
    setReady(true);
  }, []);

  if (!ready) return <p>Opening your practice notes…</p>;

  const now = new Date();
  const weekStart = new Date(now);
  const day = weekStart.getDay();
  weekStart.setHours(0, 0, 0, 0);
  weekStart.setDate(weekStart.getDate() - (day === 0 ? 6 : day - 1));
  const week = sessions.filter((session) => new Date(session.completedAt) >= weekStart);
  const days = new Set(week.map((session) => session.completedAt.slice(0, 10)));
  const minutes = week.reduce((sum, session) => sum + session.durationMinutes, 0);
  const pillars = (Object.keys(pillarLabel) as Pillar[]).map((pillar) => ({
    pillar,
    minutes: Math.round(week.reduce((sum, session) => sum + session.pillarMinutes[pillar], 0)),
  }));
  const streak = recentRun(sessions);

  return (
    <div className="space-y-6">
      <p className="font-heading text-3xl">You moved on {days.size} day{days.size === 1 ? "" : "s"} this week.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Weekly sessions" value={String(week.length)} />
        <Stat label="Movement minutes" value={String(minutes)} />
        <Stat label="Recent rhythm" value={streak >= 2 ? `${streak} days in a row` : "A session stands on its own"} />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {pillars.map((item) => (
          <li key={item.pillar} className="rounded-2xl bg-paper px-4 py-3 ring-1 ring-border">
            {pillarLabel[item.pillar]}: {item.minutes} min this week
          </li>
        ))}
      </ul>
      <section>
        <h2 className="font-heading text-2xl">Recent sessions</h2>
        {sessions.length === 0 ? (
          <p className="mt-2">
            No sessions yet. Whenever you are ready, a short practice counts.{" "}
            <Link href="/routine" className="underline">
              Build a routine
            </Link>
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {[...sessions].reverse().slice(0, 8).map((session) => (
              <li key={session.id} className="rounded-2xl bg-paper px-4 py-3 ring-1 ring-border">
                <p className="font-medium">{session.title}</p>
                <p className="text-stone">
                  {session.durationMinutes} min · {session.exercisesCompleted}{" "}
                  {session.exercisesCompleted === 1 ? "exercise" : "exercises"}
                  {session.effort ? ` · Felt ${effortLabel[session.effort].toLowerCase()}` : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4 ring-1 ring-border">
      <p className="text-stone">{label}</p>
      <p className="font-heading text-3xl">{value}</p>
    </div>
  );
}

function recentRun(sessions: SessionRecord[]) {
  const dates = [...new Set(sessions.map((session) => session.completedAt.slice(0, 10)))].sort();
  if (!dates.length) return 0;
  let run = 1;
  for (let index = dates.length - 1; index > 0; index -= 1) {
    const current = new Date(dates[index]);
    const previous = new Date(dates[index - 1]);
    const gap = (current.getTime() - previous.getTime()) / 86_400_000;
    if (gap === 1) run += 1;
    else break;
  }
  const latest = new Date(dates[dates.length - 1]);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const since = (today.getTime() - latest.getTime()) / 86_400_000;
  if (since > 1) return 0;
  return run;
}
