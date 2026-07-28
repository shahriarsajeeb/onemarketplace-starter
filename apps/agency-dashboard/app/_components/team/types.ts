export type AgencyMemberRole =
  | "Agency owner"
  | "Business manager"
  | "Agency member";

export type AgencyMemberStatus = "Active" | "Invitation pending";

export type AgencyPermission =
  | "Manage agency profile"
  | "Submit proposals"
  | "Manage contracts"
  | "View finances"
  | "Manage members";

export type AgencyMember = {
  id: number;
  name: string;
  initials: string;
  email: string;
  title: string;
  specialty: string;
  location: string;
  role: AgencyMemberRole;
  status: AgencyMemberStatus;
  joined: string;
  profileComplete: number;
  publicProfile: boolean;
  skills: string[];
  permissions: AgencyPermission[];
};
