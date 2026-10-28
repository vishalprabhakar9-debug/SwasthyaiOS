import { siteDisclaimer, stopSymptoms } from "@/content/safety";

export function SafetyBanner({ compact = false }: { compact?: boolean }) {
  return (
    <aside className="rounded-2xl border border-terracotta/30 bg-[#f8efe6] px-4 py-4" role="note">
      <p className="font-medium text-terracotta">Before you move</p>
      {compact ? (
        <p className="mt-1">Stop if you feel {stopSymptoms.join(", ")}. Seek medical care. This is movement education, not a diagnosis or a treatment.</p>
      ) : (
        <p className="mt-1">{siteDisclaimer}</p>
      )}
    </aside>
  );
}
