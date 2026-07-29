type MessageBase = {
  id: number;
  sender: "me" | "client";
  time: string;
};

export type TextMessage = MessageBase & {
  kind: "text";
  text: string;
  replyToId?: number;
  attachment?: {
    name: string;
    size: string;
    type?: string;
  };
};

export type ProposalMessage = MessageBase & {
  kind: "proposal";
  title: string;
  coverLetter: string;
  bid: string;
  duration: string;
  skills: string[];
};

export type MeetingMessage = MessageBase & {
  kind: "meeting";
  title: string;
  schedule: string;
  meetingUrl: string;
};

export type ContractMessage = MessageBase & {
  kind: "contract";
  title: string;
  budget: string;
  duration: string;
  status: "pending" | "accepted" | "declined";
};

export type MilestoneMessage = MessageBase & {
  kind: "milestone";
  title: string;
  amount: string;
  dueDate: string;
  status: "funded" | "submitted" | "changes-requested" | "approved";
  note?: string;
};

export type PaymentMessage = MessageBase & {
  kind: "payment";
  title: string;
  amount: string;
  description: string;
  status: "escrowed" | "released";
};

export type ChatMessage =
  | TextMessage
  | ProposalMessage
  | MeetingMessage
  | ContractMessage
  | MilestoneMessage
  | PaymentMessage;

export type Conversation = {
  id: number;
  client: string;
  initials: string;
  company: string;
  project: string;
  online: boolean;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
};
