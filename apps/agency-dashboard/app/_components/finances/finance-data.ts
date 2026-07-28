export const financeSections = [
  { id: "overview", label: "Overview", icon: "chart" },
  { id: "earnings", label: "Earnings", icon: "wallet" },
  { id: "withdrawals", label: "Withdrawals", icon: "arrow" },
  { id: "connects", label: "Agency Connects", icon: "proposal" },
  { id: "statements", label: "Statements", icon: "contract" },
  { id: "tax", label: "Tax information", icon: "verified" },
] as const;

export type FinanceSection = (typeof financeSections)[number]["id"];

export const agencyEarnings = [
  { id: 1, title: "Member collaboration milestone", client: "Wellmade Health", date: "July 26, 2026", amount: "$12,000.00", status: "Pending" },
  { id: 2, title: "Architecture and evaluation prototype", client: "Lumen Research", date: "July 20, 2026", amount: "$14,500.00", status: "Available" },
  { id: 3, title: "Visual identity and product foundations", client: "Aster Finance", date: "July 18, 2026", amount: "$9,000.00", status: "Available" },
  { id: 4, title: "Design system and member experience", client: "Wellmade Health", date: "June 28, 2026", amount: "$10,000.00", status: "Withdrawn" },
];

export const agencyWithdrawals = [
  { id: 1, reference: "WD-2026-0719", method: "Business bank •••• 1842", date: "July 19, 2026", amount: "$12,400.00", status: "Completed" },
  { id: 2, reference: "WD-2026-0629", method: "Business bank •••• 1842", date: "June 29, 2026", amount: "$8,200.00", status: "Completed" },
  { id: 3, reference: "WD-2026-0612", method: "Payoneer •••• 4821", date: "June 12, 2026", amount: "$6,750.00", status: "Completed" },
];

export const agencyConnectsHistory = [
  { id: 1, label: "Agency proposal submitted", detail: "Healthcare member portal", date: "July 26", amount: -16 },
  { id: 2, label: "Agency proposal submitted", detail: "Commerce analytics suite", date: "July 25", amount: -18 },
  { id: 3, label: "Monthly Agency Connects", detail: "Agency plan allocation", date: "July 20", amount: 100 },
  { id: 4, label: "Connects purchase", detail: "Business card •••• 8271", date: "July 10", amount: 80 },
];
