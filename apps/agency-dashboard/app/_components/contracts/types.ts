export type AgencyContractStatus =
  | "Active"
  | "Awaiting feedback"
  | "Completed";

export type AgencyMilestoneStatus = "Paid" | "In progress" | "Upcoming";

export type AgencyMilestone = {
  id: number;
  title: string;
  amount: string;
  due: string;
  status: AgencyMilestoneStatus;
};

export type AgencyContract = {
  id: number;
  title: string;
  client: string;
  clientInitials: string;
  clientLocation: string;
  status: AgencyContractStatus;
  started: string;
  completed?: string;
  totalBudget: string;
  earned: string;
  escrow: string;
  nextDeadline: string;
  progress: number;
  currentMilestone: string;
  description: string;
  milestones: AgencyMilestone[];
};
