export const agencySettingsSections = [
  { id: "overview", label: "Overview", icon: "solar:widget-2-linear" },
  { id: "profile", label: "Agency profile", icon: "solar:buildings-2-linear" },
  { id: "members", label: "Members & access", icon: "solar:users-group-rounded-linear" },
  { id: "security", label: "Password & security", icon: "solar:shield-keyhole-linear" },
  { id: "notifications", label: "Notifications", icon: "solar:bell-linear" },
] as const;

export type AgencySettingsSectionId =
  (typeof agencySettingsSections)[number]["id"];
