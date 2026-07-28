export type AgencyProposalStatus =
  | "Interview"
  | "Viewed"
  | "Submitted"
  | "Archived"
  | "Withdrawn";

export type AgencyProposal = {
  id: number;
  jobId: number;
  title: string;
  client: string;
  status: AgencyProposalStatus;
  submitted: string;
  clientBudget: string;
  agencyBid: string;
  duration: string;
  connects: number;
  clientRating: string;
  clientSpent: string;
  activity: string;
  coverLetter: string;
  milestonePlan: string[];
  skills: string[];
};
