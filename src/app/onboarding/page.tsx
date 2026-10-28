import type { Metadata } from "next";
import { OnboardingForm } from "@/components/onboarding-form";

export const metadata: Metadata = { title: "Build my routine" };

export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Build my routine</h1>
      <p>
        A few questions help Swasthya suggest a starting path. You can skip them and browse. Nothing here is a diagnosis, and you do not need an account.
      </p>
      <OnboardingForm />
    </div>
  );
}
