import { create } from "zustand";
import backend from "@/services/databaseService";

const defaultUserId = 1;

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
  loadMessages: (messages: MessageFrontendType[]) => void;
  removeMessage: (message: MessageFrontendType) => void;
  clearMessages: () => void;
  getAllMessages: (request: AuthorizedConversationRequest) => void;
  getResponseOfConversation: (request: AuthorizedConversationRequest) => void;
};

const useMessageStore = create<MessageState>()((set) => ({
  messageList: [],

  addMessage: (message: MessageFrontendType) =>
    set((state) => ({ messageList: [...state.messageList, message] })),

  clearMessages: () => set({ messageList: [] }),

  loadMessages: (messages: MessageFrontendType[]) =>
    set({ messageList: messages }),

  getResponseOfConversation: async ({
    convId,
    userId,
  }: AuthorizedConversationRequest) => {
    try {
      const response: MessageBackendType =
        await backend.getResponseOfConversation({
          convId,
          userId: userId ?? defaultUserId,
        });
      const responseFrontendType: MessageFrontendType = {
        content: response.content,
        role: response.role,
      };
      set((state) => ({
        messageList: [...state.messageList, responseFrontendType],
      }));
    } catch (err) {
      throw new Error(`Failed to get response from backend. err: ${err}`);
    }
  },

  getAllMessages: async ({ convId, userId }: AuthorizedConversationRequest) => {
    // fetch messages from the database
    try {
      const messageList = await backend.getAllMessagesFromConversation({
        convId,
        userId: userId ?? defaultUserId,
      });
      set({ messageList });
    } catch (err) {
      throw new Error(`Failed to fetch messages from the database ${err}`);
    }
  },

  removeMessage: (message: MessageFrontendType) =>
    set((state) => ({
      messageList: state.messageList.filter(
        (m) => m.content !== message.content,
      ),
    })),
}));

export default useMessageStore;
