export type JobStatus = "Open" | "Draft" | "Closed";

export type ClientJob = {
  id: number;
  title: string;
  status: JobStatus;
  posted: string;
  budget: number;
  level: "Entry level" | "Intermediate" | "Expert";
  duration: string;
  description: string;
  skills: string[];
  proposals: number;
  shortlisted: number;
  hires: number;
  visibility: "Marketplace";
  screeningQuestions: string[];
  milestones: { id: number; title: string; amount: number; due: string }[];
};

export const clientJobs: ClientJob[] = [
  {
    id: 1,
    title: "Senior Next.js developer for a collaborative workspace",
    status: "Open",
    posted: "18 minutes ago",
    budget: 12000,
    level: "Expert",
    duration: "3–6 months",
    description:
      "We’re looking for an experienced product engineer to build real-time collaboration features, improve application performance, and shape a thoughtful frontend architecture.",
    skills: ["Next.js", "TypeScript", "React", "PostgreSQL", "WebSockets"],
    proposals: 9,
    shortlisted: 3,
    hires: 0,
    visibility: "Marketplace",
    screeningQuestions: [
      "Describe a real-time collaboration product you have shipped.",
      "How would you approach presence and conflict resolution?",
    ],
    milestones: [
      { id: 1, title: "Architecture and prototype", amount: 3000, due: "Aug 12" },
      { id: 2, title: "Collaboration workflow", amount: 5000, due: "Sep 2" },
      { id: 3, title: "Launch and handoff", amount: 4000, due: "Sep 24" },
    ],
  },
  {
    id: 2,
    title: "Design and build a polished SaaS analytics dashboard",
    status: "Closed",
    posted: "Yesterday",
    budget: 6000,
    level: "Intermediate",
    duration: "1–2 months",
    description:
      "Translate finalized product requirements into an accessible analytics dashboard with reusable components and clear data visualization.",
    skills: ["Product design", "React", "Data visualization", "Accessibility"],
    proposals: 14,
    shortlisted: 4,
    hires: 1,
    visibility: "Marketplace",
    screeningQuestions: ["Share your strongest analytics or dashboard project."],
    milestones: [
      { id: 1, title: "UX and visual direction", amount: 2000, due: "Aug 8" },
      { id: 2, title: "Dashboard implementation", amount: 3000, due: "Aug 25" },
      { id: 3, title: "QA and handoff", amount: 1000, due: "Sep 2" },
    ],
  },
  {
    id: 3,
    title: "AI-assisted research workflow",
    status: "Draft",
    posted: "Updated 2 days ago",
    budget: 18500,
    level: "Expert",
    duration: "3–6 months",
    description:
      "Create an AI-assisted document research workflow with citations, review tools, and measurable evaluation.",
    skills: ["Applied AI", "Python", "Next.js", "PostgreSQL"],
    proposals: 0,
    shortlisted: 0,
    hires: 0,
    visibility: "Marketplace",
    screeningQuestions: [],
    milestones: [
      { id: 1, title: "Research and evaluation plan", amount: 4500, due: "TBD" },
      { id: 2, title: "Core research workflow", amount: 9000, due: "TBD" },
      { id: 3, title: "Production launch", amount: 5000, due: "TBD" },
    ],
  },
];

export type ClientProposal = {
  id: number;
  jobId: number;
  bidder: string;
  initials: string;
  accountType: "Freelancer" | "Agency";
  title: string;
  location: string;
  verified: boolean;
  online: boolean;
  rating: number;
  jobSuccess: number;
  completedProjects: number;
  bid: number;
  duration: string;
  submitted: string;
  coverLetter: string;
  skills: string[];
  milestonePlan: { title: string; amount: number; duration: string }[];
  status:
    | "New"
    | "Shortlisted"
    | "Interview"
    | "Offer sent"
    | "Rejected"
    | "Hired";
};

export const clientProposals: ClientProposal[] = [
  {
    id: 1,
    jobId: 1,
    bidder: "Shahriar Sajeeb",
    initials: "SK",
    accountType: "Freelancer",
    title: "Full-stack product engineer",
    location: "Chiang Mai, Thailand",
    verified: true,
    online: true,
    rating: 4.9,
    jobSuccess: 100,
    completedProjects: 24,
    bid: 11500,
    duration: "10 weeks",
    submitted: "12 minutes ago",
    coverLetter:
      "I’ve built collaborative products with presence, optimistic updates, and conflict-aware syncing. I would begin with a focused technical prototype, validate the event model, then deliver the product in funded milestones.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    milestonePlan: [
      { title: "Architecture and presence prototype", amount: 3000, duration: "2 weeks" },
      { title: "Collaboration workflow", amount: 5000, duration: "5 weeks" },
      { title: "Launch and documentation", amount: 3500, duration: "3 weeks" },
    ],
    status: "New",
  },
  {
    id: 2,
    jobId: 1,
    bidder: "Northstar Digital",
    initials: "ND",
    accountType: "Agency",
    title: "Senior product engineering agency",
    location: "Bangkok, Thailand · Remote",
    verified: true,
    online: true,
    rating: 4.9,
    jobSuccess: 98,
    completedProjects: 38,
    bid: 12000,
    duration: "9 weeks",
    submitted: "38 minutes ago",
    coverLetter:
      "Northstar can provide a focused product squad covering architecture, interaction design, frontend engineering, and backend delivery while keeping one accountable point of contact.",
    skills: ["Next.js", "Product design", "Node.js", "Design systems"],
    milestonePlan: [
      { title: "Product and technical foundation", amount: 3500, duration: "2 weeks" },
      { title: "End-to-end collaboration features", amount: 5500, duration: "5 weeks" },
      { title: "Hardening and launch", amount: 3000, duration: "2 weeks" },
    ],
    status: "Shortlisted",
  },
  {
    id: 3,
    jobId: 1,
    bidder: "Daniel Cho",
    initials: "DC",
    accountType: "Freelancer",
    title: "Senior TypeScript engineer",
    location: "Toronto, Canada",
    verified: true,
    online: false,
    rating: 4.8,
    jobSuccess: 97,
    completedProjects: 31,
    bid: 10800,
    duration: "12 weeks",
    submitted: "2 hours ago",
    coverLetter:
      "My recent work includes high-scale WebSocket services and collaborative editing interfaces. I can own the technical architecture and production delivery.",
    skills: ["TypeScript", "React", "Node.js", "WebSockets"],
    milestonePlan: [
      { title: "Technical prototype", amount: 2800, duration: "3 weeks" },
      { title: "Feature delivery", amount: 5500, duration: "6 weeks" },
      { title: "Production readiness", amount: 2500, duration: "3 weeks" },
    ],
    status: "Interview",
  },
  {
    id: 4,
    jobId: 2,
    bidder: "Amelia Morgan",
    initials: "AM",
    accountType: "Freelancer",
    title: "Senior product designer",
    location: "London, United Kingdom",
    verified: true,
    online: true,
    rating: 5,
    jobSuccess: 100,
    completedProjects: 28,
    bid: 6000,
    duration: "7 weeks",
    submitted: "Yesterday",
    coverLetter:
      "I specialize in complex SaaS dashboards and can take this from interaction design through a production-ready component system, working closely with your engineering team.",
    skills: ["Product design", "Design systems", "Analytics", "Accessibility"],
    milestonePlan: [
      { title: "Product UX and visual direction", amount: 2000, duration: "2 weeks" },
      { title: "Dashboard design system", amount: 2500, duration: "3 weeks" },
      { title: "Implementation support and QA", amount: 1500, duration: "2 weeks" },
    ],
    status: "Hired",
  },
  {
    id: 5,
    jobId: 2,
    bidder: "Commonfolk Studio",
    initials: "CS",
    accountType: "Agency",
    title: "Product design and frontend agency",
    location: "Melbourne, Australia · Remote",
    verified: true,
    online: false,
    rating: 4.8,
    jobSuccess: 96,
    completedProjects: 34,
    bid: 6800,
    duration: "8 weeks",
    submitted: "2 days ago",
    coverLetter:
      "Our product design and frontend specialists can deliver the dashboard as one cohesive engagement, including accessible visualizations and reusable React components.",
    skills: ["Product design", "React", "Data visualization", "Storybook"],
    milestonePlan: [
      { title: "Discovery and dashboard UX", amount: 2200, duration: "2 weeks" },
      { title: "Design and implementation", amount: 3600, duration: "4 weeks" },
      { title: "QA and handoff", amount: 1000, duration: "2 weeks" },
    ],
    status: "Rejected",
  },
];

export const clientTalentProfiles: ClientProposal[] = [
  ...clientProposals.filter(
    (proposal) => proposal.accountType === "Freelancer",
  ),
  {
    id: 6,
    jobId: 1,
    bidder: "Maya Robinson",
    initials: "MR",
    accountType: "Freelancer",
    title: "Machine learning engineer",
    location: "New York, United States",
    verified: true,
    online: true,
    rating: 4.9,
    jobSuccess: 99,
    completedProjects: 26,
    bid: 11800,
    duration: "10 weeks",
    submitted: "Agency member",
    coverLetter:
      "I design practical machine-learning systems that move from experimentation to dependable, measurable production outcomes.",
    skills: ["Applied AI", "Python", "Data products", "MLOps"],
    milestonePlan: [],
    status: "New",
  },
  createAgencyMemberProfile(
    7,
    "Nadia Rahman",
    "NR",
    "Product manager",
    "Dhaka, Bangladesh · Remote",
    ["Product strategy", "Discovery", "Delivery", "SaaS"],
  ),
  createAgencyMemberProfile(
    8,
    "Lucas Martin",
    "LM",
    "Frontend engineer",
    "Paris, France · Remote",
    ["React", "Accessibility", "Design systems", "TypeScript"],
  ),
  createAgencyMemberProfile(
    9,
    "Priya Nair",
    "PN",
    "Data engineer",
    "Bengaluru, India · Remote",
    ["Python", "PostgreSQL", "Analytics", "Data pipelines"],
  ),
  createAgencyMemberProfile(
    10,
    "Ethan Williams",
    "EW",
    "Cloud infrastructure engineer",
    "London, United Kingdom · Remote",
    ["AWS", "DevOps", "Platform reliability", "Cloud architecture"],
  ),
];

function createAgencyMemberProfile(
  id: number,
  bidder: string,
  initials: string,
  title: string,
  location: string,
  skills: string[],
): ClientProposal {
  return {
    id,
    jobId: 1,
    bidder,
    initials,
    accountType: "Freelancer",
    title,
    location,
    verified: true,
    online: false,
    rating: 4.9,
    jobSuccess: 98,
    completedProjects: 22,
    bid: 10500,
    duration: "10 weeks",
    submitted: "Agency member",
    coverLetter: `${bidder} is a verified specialist working through Northstar Digital.`,
    skills,
    milestonePlan: [],
    status: "New",
  };
}

export type ClientContract = {
  id: number;
  title: string;
  talent: string;
  initials: string;
  accountType: "Freelancer" | "Agency";
  status: "Active" | "Awaiting approval" | "Completed";
  started: string;
  totalBudget: number;
  paid: number;
  escrow: number;
  progress: number;
  nextDeadline: string;
  description: string;
  milestones: {
    id: number;
    title: string;
    amount: number;
    due: string;
    status: "Paid" | "In progress" | "Upcoming" | "Submitted";
    submissionComment?: string;
    clientRequirements?: string;
  }[];
};

export const clientContracts: ClientContract[] = [
  {
    id: 1,
    title: "Collaborative healthcare workspace",
    talent: "Northstar Digital",
    initials: "ND",
    accountType: "Agency",
    status: "Awaiting approval",
    started: "June 18, 2026",
    totalBudget: 42000,
    paid: 18000,
    escrow: 12000,
    progress: 68,
    nextDeadline: "August 18",
    description:
      "Design and engineering of a secure collaborative workspace for clinical teams.",
    milestones: [
      { id: 1, title: "Product and architecture foundation", amount: 10000, due: "Jun 30", status: "Paid" },
      { id: 2, title: "Core workspace experience", amount: 8000, due: "Jul 22", status: "Paid" },
      {
        id: 3,
        title: "Collaboration milestone",
        amount: 12000,
        due: "Aug 18",
        status: "Submitted",
        submissionComment:
          "The collaboration workflow is ready for review. I completed presence indicators, threaded comments, mentions, and conflict-safe optimistic updates. Please test the shared workspace flow in the staging build.",
      },
      { id: 4, title: "Launch and handoff", amount: 12000, due: "Sep 12", status: "Upcoming" },
    ],
  },
  {
    id: 2,
    title: "SaaS analytics dashboard",
    talent: "Shahriar Sajeeb",
    initials: "SK",
    accountType: "Freelancer",
    status: "Active",
    started: "July 3, 2026",
    totalBudget: 6000,
    paid: 2000,
    escrow: 3000,
    progress: 45,
    nextDeadline: "August 25",
    description:
      "Accessible analytics dashboard implementation and reusable component system.",
    milestones: [
      { id: 1, title: "UX and visual direction", amount: 2000, due: "Jul 20", status: "Paid" },
      { id: 2, title: "Dashboard implementation", amount: 3000, due: "Aug 25", status: "In progress" },
      { id: 3, title: "QA and handoff", amount: 1000, due: "Sep 2", status: "Upcoming" },
    ],
  },
];

export type CompletedClientContract = {
  id: number;
  title: string;
  talent: string;
  accountType: "Freelancer" | "Agency";
  completed: string;
  budget: number;
  clientReview?: {
    rating: number;
    text: string;
  };
  talentReview?: {
    rating: number;
    text: string;
  };
};

export const completedClientContracts: CompletedClientContract[] = [
  {
    id: 1,
    title: "Patient onboarding experience",
    talent: "Amelia Morgan",
    accountType: "Freelancer",
    completed: "May 18, 2026",
    budget: 8500,
    clientReview: {
      rating: 5,
      text: "Amelia brought clarity to a complex onboarding journey and delivered a thoughtful, polished system our team could confidently build.",
    },
    talentReview: {
      rating: 5,
      text: "Olivia provided clear context, made timely decisions, and treated design as a genuine partnership. A fantastic client to work with.",
    },
  },
  {
    id: 2,
    title: "Clinical operations reporting platform",
    talent: "Northstar Digital",
    accountType: "Agency",
    completed: "February 27, 2026",
    budget: 24000,
    clientReview: {
      rating: 4.9,
      text: "Northstar handled product strategy and engineering with one accountable process. The platform launched smoothly and has been dependable in production.",
    },
    talentReview: {
      rating: 4.9,
      text: "Wellmade Health was organized, responsive, and respectful of the team’s expertise. Requirements and feedback remained focused throughout delivery.",
    },
  },
  {
    id: 3,
    title: "Accessibility remediation sprint",
    talent: "Lucas Martin",
    accountType: "Freelancer",
    completed: "December 12, 2025",
    budget: 4200,
    clientReview: {
      rating: 5,
      text: "Lucas resolved the accessibility issues quickly and documented every change clearly for our engineering team.",
    },
  },
  {
    id: 4,
    title: "Care-team scheduling prototype",
    talent: "Daniel Cho",
    accountType: "Freelancer",
    completed: "October 4, 2025",
    budget: 6800,
    clientReview: {
      rating: 4.9,
      text: "Daniel translated a complicated scheduling model into a fast, reliable prototype and communicated tradeoffs clearly.",
    },
    talentReview: {
      rating: 5,
      text: "Olivia was decisive, well prepared, and always available when product questions needed clarification.",
    },
  },
  {
    id: 5,
    title: "Clinical design-system foundation",
    talent: "Commonfolk Studio",
    accountType: "Agency",
    completed: "July 22, 2025",
    budget: 15000,
    clientReview: {
      rating: 4.8,
      text: "Commonfolk gave our teams a flexible visual foundation that improved both design consistency and engineering velocity.",
    },
    talentReview: {
      rating: 4.9,
      text: "A collaborative client with clear goals, thoughtful feedback, and strong respect for the creative process.",
    },
  },
  {
    id: 6,
    title: "Operations data migration",
    talent: "Priya Nair",
    accountType: "Freelancer",
    completed: "March 14, 2025",
    budget: 9200,
    talentReview: {
      rating: 4.9,
      text: "The Wellmade team supplied excellent documentation and made stakeholders available throughout a sensitive migration.",
    },
  },
];

export type ClientConversation = {
  id: number;
  person: string;
  initials: string;
  accountType: "Freelancer" | "Agency";
  context: string;
  contextHref: string;
  online: boolean;
  unread: number;
  lastMessage: string;
  time: string;
  messages: ClientMessage[];
};

export type ClientMessage =
  | {
      id: number;
      kind: "text";
      sender: "client" | "talent";
      text: string;
      time: string;
      replyToId?: number;
      attachment?: {
        name: string;
        size: string;
        type: string;
      };
    }
  | {
      id: number;
      kind: "proposal";
      sender: "talent";
      title: string;
      bid: number;
      duration: string;
      summary: string;
      skills: string[];
      href: string;
      time: string;
    }
  | {
      id: number;
      kind: "meeting";
      sender: "client" | "talent";
      title: string;
      startsAt: string;
      meetUrl: string;
      time: string;
    }
  | {
      id: number;
      kind: "contract";
      sender: "client";
      title: string;
      amount: number;
      status: "Awaiting acceptance" | "Active";
      href: string;
      time: string;
    }
  | {
      id: number;
      kind: "milestone";
      sender: "client" | "talent";
      title: string;
      amount: number;
      status: "Funded" | "Submitted" | "Changes requested" | "Approved";
      href: string;
      time: string;
    }
  | {
      id: number;
      kind: "payment";
      sender: "system";
      title: string;
      amount: number;
      status: "Protected in escrow" | "Released";
      time: string;
    };

export const clientConversations: ClientConversation[] = [
  {
    id: 1,
    person: "Northstar Digital",
    initials: "ND",
    accountType: "Agency",
    context: "Collaborative healthcare workspace",
    contextHref: "/contracts",
    online: true,
    unread: 2,
    lastMessage: "The updated prototype is ready for review.",
    time: "8m",
    messages: [
      {
        id: 1,
        kind: "contract",
        sender: "client",
        title: "Collaborative healthcare workspace",
        amount: 42000,
        status: "Active",
        href: "/contracts",
        time: "June 18",
      },
      {
        id: 2,
        kind: "milestone",
        sender: "client",
        title: "Collaboration milestone",
        amount: 12000,
        status: "Funded",
        href: "/contracts",
        time: "August 2",
      },
      {
        id: 3,
        kind: "payment",
        sender: "system",
        title: "Collaboration milestone",
        amount: 12000,
        status: "Protected in escrow",
        time: "August 2",
      },
      {
        id: 4,
        kind: "text",
        sender: "client",
        text: "Can you share the updated notification prototype?",
        time: "10:42 AM",
      },
      {
        id: 5,
        kind: "text",
        sender: "talent",
        text: "Yes—the updated prototype is ready for review. We also included the accessibility notes.",
        time: "10:51 AM",
      },
      {
        id: 6,
        kind: "milestone",
        sender: "talent",
        title: "Collaboration milestone",
        amount: 12000,
        status: "Submitted",
        href: "/contracts",
        time: "10:52 AM",
      },
    ],
  },
  {
    id: 2,
    person: "Shahriar Sajeeb",
    initials: "SK",
    accountType: "Freelancer",
    context: "SaaS analytics dashboard",
    contextHref: "/contracts",
    online: true,
    unread: 0,
    lastMessage: "I’ll share the responsive build tomorrow.",
    time: "2h",
    messages: [
      {
        id: 1,
        kind: "milestone",
        sender: "client",
        title: "Dashboard implementation",
        amount: 3000,
        status: "Funded",
        href: "/contracts",
        time: "July 21",
      },
      {
        id: 2,
        kind: "text",
        sender: "talent",
        text: "The main dashboard views are complete. I’ll share the responsive build tomorrow.",
        time: "8:35 AM",
      },
      {
        id: 3,
        kind: "text",
        sender: "client",
        text: "Great, thank you. The current direction looks strong.",
        time: "8:41 AM",
      },
    ],
  },
  {
    id: 3,
    person: "Daniel Cho",
    initials: "DC",
    accountType: "Freelancer",
    context: "Senior Next.js developer proposal",
    contextHref: "/proposals",
    online: false,
    unread: 1,
    lastMessage: "Happy to walk through the architecture.",
    time: "1d",
    messages: [
      {
        id: 1,
        kind: "proposal",
        sender: "talent",
        title: "Senior Next.js developer for a collaborative workspace",
        bid: 10800,
        duration: "12 weeks",
        summary:
          "High-scale WebSocket services and collaborative editing interfaces with end-to-end technical ownership.",
        skills: ["TypeScript", "React", "Node.js", "WebSockets"],
        href: "/proposals?job=1",
        time: "Yesterday",
      },
      {
        id: 2,
        kind: "text",
        sender: "client",
        text: "We reviewed your proposal and would like to discuss your architecture approach.",
        time: "Yesterday",
      },
      {
        id: 3,
        kind: "meeting",
        sender: "client",
        title: "Architecture interview",
        startsAt: "Today at 3:30 PM",
        meetUrl: "https://meet.google.com/",
        time: "Yesterday",
      },
      {
        id: 4,
        kind: "text",
        sender: "talent",
        text: "Happy to walk through the architecture and answer any questions.",
        time: "Yesterday",
      },
    ],
  },
];
