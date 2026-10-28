import type { Metadata } from "next";
import { siteDisclaimer, stopSymptoms } from "@/content/safety";

export const metadata: Metadata = { title: "Safety" };

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Safety</h1>
      <p>{siteDisclaimer}</p>
      <h2 className="font-heading text-3xl">Stop and seek care</h2>
      <ul className="list-disc pl-5">
        {stopSymptoms.map((symptom) => (
          <li key={symptom}>{symptom}</li>
        ))}
      </ul>
      <h2 className="font-heading text-3xl">Talk with a clinician first</h2>
      <p>
        If you live with a heart condition, have had recent surgery, or have osteoporosis, discuss vigorous exercise with a qualified health professional. Swasthya will keep suggestions gentle when you tell it about those situations. That is not a clearance to exercise, and it is not a diagnosis.
      </p>
      <p>
        Sharp pain is a reason to stop a movement and choose another path. A smaller range, a chair, or a rest are successful outcomes.
      </p>
    </div>
  );
}
