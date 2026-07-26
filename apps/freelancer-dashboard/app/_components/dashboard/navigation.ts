export const headerNavigation = [
  { href: "/", label: "Find work" },
  { href: "/my-proposals", label: "My proposals" },
  { href: "/contracts", label: "Contracts" },
  { href: "/saved-jobs", label: "Saved jobs" },
] as const;

export const sidebarNavigation = [
  { href: "/", label: "Home", icon: "solar:home-2-linear" },
  {
    href: "/my-proposals",
    label: "My proposals",
    icon: "solar:document-text-linear",
  },
  {
    href: "/contracts",
    label: "Contracts",
    icon: "solar:case-round-linear",
  },
  {
    href: "/saved-jobs",
    label: "Saved jobs",
    icon: "solar:bookmark-linear",
  },
  {
    href: "/messages",
    label: "Messages",
    icon: "solar:chat-round-dots-linear",
  },
  { href: "/settings", label: "Settings", icon: "solar:settings-linear" },
] as const;
