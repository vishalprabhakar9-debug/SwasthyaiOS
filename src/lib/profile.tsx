"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Profile } from "@/lib/types";
import { defaultProfile, loadProfile, saveProfile } from "@/lib/storage";

interface ProfileContextValue {
  profile: Profile;
  ready: boolean;
  update: (patch: Partial<Profile> | ((current: Profile) => Profile)) => void;
  replace: (profile: Profile) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveProfile(profile);
    const root = document.documentElement;
    root.dataset.text = profile.textSize;
    root.dataset.easyView = profile.easyView ? "true" : "false";
    root.dataset.motion = profile.reducedMotion ? "reduce" : "ok";
  }, [profile, ready]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      ready,
      update: (patch) => {
        setProfile((current) => (typeof patch === "function" ? patch(current) : { ...current, ...patch }));
      },
      replace: setProfile,
    }),
    [profile, ready],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const value = useContext(ProfileContext);
  if (!value) throw new Error("useProfile must be used within ProfileProvider");
  return value;
}
