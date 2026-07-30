export const settingsSections = [
  { id: "overview", label: "Overview", icon: "solar:widget-2-linear" },
  { id: "connects", label: "Connects", icon: "solar:bolt-linear" },
  { id: "earnings", label: "Earnings", icon: "solar:wallet-money-linear" },
  { id: "withdrawal", label: "Withdrawal methods", icon: "solar:card-transfer-linear" },
  { id: "agency", label: "Agency", icon: "solar:buildings-2-linear" },
  { id: "tax", label: "Tax information", icon: "solar:document-text-linear" },
  { id: "verification", label: "Identity verification", icon: "solar:user-id-linear" },
  { id: "security", label: "Password & security", icon: "solar:shield-keyhole-linear" },
  { id: "notifications", label: "Notifications", icon: "solar:bell-linear" },
] as const;

export type SettingsSectionId = (typeof settingsSections)[number]["id"];

export const connectsHistory = [
  { id: 1, label: "Proposal submitted", detail: "AI-assisted research platform", date: "July 25, 2026", amount: -12 },
  { id: 2, label: "Proposal submitted", detail: "SaaS analytics dashboard", date: "July 24, 2026", amount: -6 },
  { id: 3, label: "Monthly Connects", detail: "Freelancer plan allocation", date: "July 20, 2026", amount: 60 },
  { id: 4, label: "Proposal withdrawn refund", detail: "Fintech component system", date: "July 14, 2026", amount: 8 },
];

export const earningsHistory = [
  { id: 1, client: "Northstar Labs", milestone: "Real-time document sync", date: "July 24, 2026", amount: "$3,000", status: "Available" },
  { id: 2, client: "Lumen Research", milestone: "Architecture and prototype", date: "July 20, 2026", amount: "$3,500", status: "Pending" },
  { id: 3, client: "Commonfolk Studio", milestone: "Priority remediation", date: "July 18, 2026", amount: "$2,000", status: "Withdrawn" },
  { id: 4, client: "Northstar Labs", milestone: "Architecture and presence", date: "June 30, 2026", amount: "$2,500", status: "Withdrawn" },
];
