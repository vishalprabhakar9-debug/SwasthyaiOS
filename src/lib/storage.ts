import type { Profile, SessionRecord } from "@/lib/types";

export const PROFILE_KEY = "swasthya.profile.v1";
export const SESSION_KEY = "swasthya.sessions.v1";
export const SAVED_KEY = "swasthya.saved.v1";
export const CHECK_KEY = "swasthya.check.v1";
export const ROUTINE_KEY = "swasthya.activeRoutine.v1";

export const defaultProfile: Profile = {
  ageBand: null,
  activity: null,
  goals: [],
  abilities: {
    walk20: null,
    floorSit: null,
    floorRise: null,
    partialSquat: null,
    armsOverhead: null,
    oneLeg: null,
    wallPushup: null,
  },
  limitations: [],
  limitationNote: "",
  floorComfort: null,
  textSize: "normal",
  easyView: false,
  reducedMotion: false,
  personalization: true,
  onboarded: false,
  effortBias: 0,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function loadProfile(): Profile {
  return { ...defaultProfile, ...read<Partial<Profile>>(PROFILE_KEY, {}) };
}

export function saveProfile(profile: Profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function loadSessions(): SessionRecord[] {
  return read<SessionRecord[]>(SESSION_KEY, []);
}

export function saveSession(session: SessionRecord) {
  const all = loadSessions();
  all.push(session);
  localStorage.setItem(SESSION_KEY, JSON.stringify(all));
}

export function loadSaved(): string[] {
  return read<string[]>(SAVED_KEY, []);
}

export function toggleSaved(slug: string) {
  const current = loadSaved();
  const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
  localStorage.setItem(SAVED_KEY, JSON.stringify(next));
  return next;
}

export function clearPersonalData() {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SAVED_KEY);
  localStorage.removeItem(CHECK_KEY);
  sessionStorage.removeItem(ROUTINE_KEY);
}
