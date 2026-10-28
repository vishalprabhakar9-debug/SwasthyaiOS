import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">About {brand.name}</h1>
      <p className="text-xl">{brand.subtitle}</p>
      <p>
        {brand.name} is a movement encyclopedia for adults. It introduces Indian bodyweight traditions — dand, baithak, Surya Namaskar, and quieter mobility — with paths for different bodies. The brand philosophy is simple: move for life.
      </p>
      <h2 className="font-heading text-3xl">Privacy</h2>
      <p>
        You can browse every exercise without an account. If you answer the onboarding questions, they are stored in this browser so routines can adapt. {brand.name} does not sell personal health information. You can turn personalization off or delete the profile, history, and saved movements from the profile page.
      </p>
      <h2 className="font-heading text-3xl">What this is not</h2>
      <p>
        This is not a gym brand, a bodybuilding program, or a medical service. Illustrations are a consistent teaching system, ready to be replaced later by commissioned drawings in the same poses.
      </p>
      <p>Other names considered for the project: {brand.alternatives.join(", ")}.</p>
    </div>
  );
}
