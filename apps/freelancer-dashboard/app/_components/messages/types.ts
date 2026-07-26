export type ChatMessage = {
  id: number;
  sender: "me" | "client";
  text: string;
  time: string;
  attachment?: {
    name: string;
    size: string;
  };
};

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
