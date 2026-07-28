export type AgencyNotification = {
  id: number;
  title: string;
  description: string;
  time: string;
  href: string;
  icon: string;
  unread: boolean;
};

export const agencyNotifications: AgencyNotification[] = [
  {
    id: 1,
    title: "Proposal viewed",
    description: "Orbit Commerce viewed your agency proposal.",
    time: "12 minutes ago",
    href: "/proposals",
    icon: "solar:eye-linear",
    unread: true,
  },
  {
    id: 2,
    title: "Milestone approved",
    description: "Lumen Research approved the architecture milestone.",
    time: "2 hours ago",
    href: "/contracts",
    icon: "solar:verified-check-linear",
    unread: true,
  },
  {
    id: 3,
    title: "New client message",
    description: "Olivia Bennett requested an updated prototype.",
    time: "3 hours ago",
    href: "/messages",
    icon: "solar:chat-round-dots-linear",
    unread: false,
  },
  {
    id: 4,
    title: "Member joined",
    description: "Amelia Morgan accepted the agency invitation.",
    time: "Yesterday",
    href: "/team",
    icon: "solar:user-plus-rounded-linear",
    unread: false,
  },
];
