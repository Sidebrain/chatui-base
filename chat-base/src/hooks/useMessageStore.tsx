import { MessageFrontendType } from "@/types/BackendDatabaseModelTypes";
import { create } from "zustand";

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
