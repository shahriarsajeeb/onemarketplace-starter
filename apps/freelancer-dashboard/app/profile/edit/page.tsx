import type { Metadata } from "next";
import { ProfileEditor } from "../../my-profile/profile-editor";

export const metadata: Metadata = {
  title: "Set Up Freelancer Profile | OneMarketplace.io",
  description:
    "Set up your freelancer profile, professional information, skills, and portfolio.",
};

export default function EditFreelancerProfilePage() {
  return <ProfileEditor initialEditing />;
}
