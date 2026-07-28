export type AgencyJob = {
  id: number;
  title: string;
  company: string;
  verified: boolean;
  posted: string;
  budget: string;
  budgetValue: number;
  level: "Intermediate" | "Expert";
  duration: string;
  description: string;
  skills: string[];
  proposals: string;
  rating: number;
  spent: string;
  location: string;
  featured?: boolean;
};
