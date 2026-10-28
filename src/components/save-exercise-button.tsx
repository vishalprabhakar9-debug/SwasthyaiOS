"use client";

import { useEffect, useState } from "react";
import { loadSaved, toggleSaved } from "@/lib/storage";
import { Button } from "@/components/ui/button";

export function SaveExerciseButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setSaved(loadSaved().includes(slug));
  }, [slug]);
  return (
    <Button
      type="button"
      variant={saved ? "secondary" : "default"}
      onClick={() => setSaved(toggleSaved(slug).includes(slug))}
    >
      {saved ? "Saved to my routine" : "Add to my routine"}
    </Button>
  );
}
