import { Check, TriangleAlert } from "lucide-react";
import type { Appearance, AvoidFrame, Pose } from "@/lib/types";
import { Figure } from "@/components/illustration/Figure";

export function DoDontIllustration({
  goodPose,
  goodCaption,
  avoid,
  appearance,
}: {
  goodPose: Pose;
  goodCaption: string;
  avoid: AvoidFrame;
  appearance: Appearance;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <figure className="rounded-2xl bg-paper p-4 ring-1 ring-forest/30">
        <figcaption className="mb-2 flex items-center gap-2 font-medium text-forest">
          <Check className="size-5" aria-hidden="true" />
          Good form
        </figcaption>
        <Figure pose={goodPose} appearance={appearance} className="mx-auto h-48" title={goodCaption} />
        <p className="mt-2">{goodCaption}</p>
      </figure>
      <figure className="rounded-2xl bg-[#f8efe6] p-4 ring-1 ring-terracotta/40">
        <figcaption className="mb-2 flex items-center gap-2 font-medium text-terracotta">
          <TriangleAlert className="size-5" aria-hidden="true" />
          Avoid
        </figcaption>
        <Figure pose={avoid.pose} appearance={appearance} className="mx-auto h-48" title={avoid.description} />
        <p className="mt-2 font-medium">{avoid.caption}</p>
        <p className="text-stone">{avoid.description}</p>
      </figure>
    </div>
  );
}
