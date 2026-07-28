export const agencyHeaderNavigation = [
  { href: "/", label: "Find work" },
  { href: "/proposals", label: "Proposals" },
  { href: "/contracts", label: "Contracts" },
  { href: "/team", label: "Team" },
] as const;

export const agencyNavigation = [
  { href: "/", label: "Find work", icon: "home" },
  { href: "/proposals", label: "Proposals", icon: "proposal" },
  { href: "/contracts", label: "Contracts", icon: "contract" },
  { href: "/team", label: "Team", icon: "team" },
  { href: "/messages", label: "Messages", icon: "message" },
  { href: "/finances", label: "Finances", icon: "wallet" },
  { href: "/settings", label: "Settings", icon: "settings" },
] as const;
