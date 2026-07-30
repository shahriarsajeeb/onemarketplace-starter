import type { Metadata } from "next";
import { ProfileEditor } from "./profile-editor";

export const metadata: Metadata = {
  title: "My Profile | OneMarketplace.io",
  description:
    "Manage your freelancer profile, portfolio, skills, and professional information.",
};

export default function MyProfilePage() {
  return <ProfileEditor />;
}
