export type LLMType = {
  id: number;
  created_at: string;
  provider: string;
  model: string;
  prompt_tokens_cost: number;
  completion_tokens_cost: number;
};
export type MessageFrontendType = MessageBackendType;

export type MessageBackendType = {
  id: number;
  created_at: string;
  updated_at: string;
  role: "user" | "assistant" | "system";
  content: string;
  conv_id: number;
  prompt_tokens: number;
  completion_tokens: number;
  cost: number;
  llm_id: number;
  llm: LLMType;
};
export type AuthorizedConversationRequestType = {
  userId: number;
  convId: number;
};

export type AuthorizedAIResponseRequestType = {
  userId: number;
  convId: number;
  selectedModel: LLMType;
};
export type AddMessagetoConversationType = {
  message: Pick<MessageFrontendType, "content" | "role">;
  userId: number;
  convId: number;
};

export type ConversationBackendType = {
  id: number;
  created_at: string;
  updated_at: string;
  owner_id: number;
  summary: string;
  description: string;
  messages: MessageBackendType[];
};
