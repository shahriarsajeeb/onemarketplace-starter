export type NotificationCategory =
  | "Contracts"
  | "Proposals"
  | "Messages"
  | "Payments"
  | "Account";

export type DashboardNotification = {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
  date: string;
  href: string;
  category: NotificationCategory;
  unread: boolean;
};
