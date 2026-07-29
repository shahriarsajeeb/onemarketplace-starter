export const clientHeaderNavigation = [
  { href: "/", label: "Overview" },
  { href: "/jobs", label: "Job posts" },
  { href: "/proposals", label: "Proposals" },
  { href: "/contracts", label: "Contracts" },
] as const;

export const clientSidebarNavigation = [
  { href: "/", label: "Home", icon: "solar:home-2-linear" },
  { href: "/jobs", label: "Job posts", icon: "solar:document-add-linear" },
  { href: "/proposals", label: "Proposals", icon: "solar:users-group-rounded-linear" },
  { href: "/contracts", label: "Contracts", icon: "solar:case-round-linear" },
  { href: "/messages", label: "Messages", icon: "solar:chat-round-dots-linear" },
  { href: "/settings", label: "Settings", icon: "solar:settings-linear" },
] as const;
