export type MilestoneStatus = "Paid" | "In progress" | "Upcoming";
export type ContractStatus = "Active" | "Awaiting feedback";

export type Milestone = {
  id: number;
  title: string;
  amount: string;
  due: string;
  status: MilestoneStatus;
};

export type Contract = {
  id: number;
  title: string;
  client: string;
  clientInitials: string;
  clientLocation: string;
  status: ContractStatus;
  started: string;
  totalBudget: string;
  earned: string;
  funded: string;
  nextDeadline: string;
  progress: number;
  currentMilestone: string;
  description: string;
  milestones: Milestone[];
};
