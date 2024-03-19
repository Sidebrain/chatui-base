import {
  ChatCompletionFunctionMessageParam,
  ChatCompletionMessageParam,
  ChatCompletionToolMessageParam,
} from "openai/resources/index.mjs";
import { create } from "zustand";

export type MessageType = Exclude<
  ChatCompletionMessageParam,
  ChatCompletionFunctionMessageParam | ChatCompletionToolMessageParam
>;

type MessageState = {
  messageList: MessageType[];
  addMessage: (message: MessageType) => void;
  loadMessages: (messages: MessageType[]) => void;
  removeMessage: (message: MessageType) => void;
  clearMessages: () => void;
};

const useMessageStore = create<MessageState>()((set) => ({
  messageList: [],

  addMessage: (message: MessageType) =>
    set((state) => ({ messageList: [...state.messageList, message] })),

  clearMessages: () => set({ messageList: [] }),

  loadMessages: (messages: MessageType[]) => set({ messageList: messages }),

  removeMessage: (message: MessageType) =>
    set((state) => ({
      messageList: state.messageList.filter(
        (m) => m.content !== message.content,
      ),
    })),
}));

export default useMessageStore;
