import { create } from "zustand";

export type MessageFrontendType = {
  content: string;
  role: "user" | "assistant" | "system";
};

export type MessageBackendType = {
  id: number;
  created_at: string;
  updated_at: string;
  role: "user" | "assistant" | "system";
  content: string;
  conv_id: number;
};

export type AuthorizedConversationRequest = {
  userId: number;
  convId: number;
};

type MessageState = {
  messageList: MessageFrontendType[];
  addMessage: (message: MessageFrontendType) => void;
  loadNewMessageList: (messages: MessageFrontendType[]) => void;
  removeMessage: (message: MessageFrontendType) => void;
  clearMessages: () => void;
};

const useMessageStore = create<MessageState>()((set) => ({
  messageList: [],

  addMessage: (message: MessageFrontendType) =>
    set((state) => ({ messageList: [...state.messageList, message] })),

  clearMessages: () => set({ messageList: [] }),

  loadNewMessageList: (messages: MessageFrontendType[]) =>
    set({ messageList: messages }),

  removeMessage: (message: MessageFrontendType) =>
    set((state) => ({
      messageList: state.messageList.filter(
        (m) => m.content !== message.content,
      ),
    })),
}));

export default useMessageStore;
