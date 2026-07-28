export type AgencyChatMessage = {
  id: number;
  sender: "agency" | "client";
  text: string;
  time: string;
  attachment?: {
    name: string;
    size: string;
  };
};

export type AgencyConversation = {
  id: number;
  client: string;
  initials: string;
  company: string;
  contextType: "Proposal" | "Contract";
  contextTitle: string;
  contextHref: "/proposals" | "/contracts";
  online: boolean;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: AgencyChatMessage[];
};
