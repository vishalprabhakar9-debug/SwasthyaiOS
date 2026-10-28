import type { Metadata } from "next";
import { ProfilePanel } from "@/components/profile-panel";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 px-4 py-8">
      <h1 className="font-heading text-5xl">Profile</h1>
      <p>Text size, Easy View, and the answers used to shape routines. All of it stays in this browser.</p>
      <ProfilePanel />
    </div>
  );
}
