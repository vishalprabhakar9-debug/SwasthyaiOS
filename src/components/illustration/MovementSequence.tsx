"use client";

import { ArrowDown, ArrowLeftRight, ArrowUp, RotateCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Appearance, Frame } from "@/lib/types";
import { Figure } from "@/components/illustration/Figure";
import { useProfile } from "@/lib/profile";

const arrows = {
  down: ArrowDown,
  up: ArrowUp,
  side: ArrowLeftRight,
  rotate: RotateCw,
};

export function MovementSequence({
  frames,
  appearance,
}: {
  frames: Frame[];
  appearance: Appearance;
}) {
  const { profile } = useProfile();
  const systemReduce = useReducedMotion();
  const allow = !profile.reducedMotion && !systemReduce;

  return (
    <ol className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {frames.map((frame, index) => {
        const Arrow = frame.arrow ? arrows[frame.arrow] : null;
        const inner = (
          <>
            <Figure pose={frame.pose} appearance={appearance} className="h-44 w-full" />
            <figcaption className="mt-2 text-center">
              <span className="block font-medium text-forest">
                {index + 1}. {frame.label}
              </span>
              <span className="sr-only">{frame.description}</span>
            </figcaption>
            {Arrow ? (
              <Arrow className="mx-auto mt-1 size-5 text-terracotta" aria-hidden="true" />
            ) : null}
          </>
        );
        return (
          <li key={`${frame.pose}-${frame.label}`}>
            {allow ? (
              <motion.figure
                className="rounded-2xl bg-paper p-3 shadow-sm ring-1 ring-border"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25 }}
              >
                {inner}
              </motion.figure>
            ) : (
              <figure className="rounded-2xl bg-paper p-3 shadow-sm ring-1 ring-border">{inner}</figure>
            )}
          </li>
        );
      })}
    </ol>
  );
}
