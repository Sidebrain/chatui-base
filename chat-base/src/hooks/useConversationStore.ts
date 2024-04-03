import { DefaultUserId } from "@/constants";
import backend, { ConversationBackendType } from "@/services/backendService";
import { create } from "zustand";

type ConversationState = {
  activeConvId: number | null;
  conversations: ConversationBackendType[];
  // add isloading and error state
  initializeConversationStore: () => void;
  setActiveConvId: (convId: number) => void;
  setConversations: (conversations: ConversationBackendType[]) => void;
  addConversation: (conversation: ConversationBackendType) => void;
  setAll: (
    convId: number | null,
    conversations: ConversationBackendType[],
  ) => void;
};

const useConversationStore = create<ConversationState>()((set) => ({
  activeConvId: null,
  conversations: [],
  setActiveConvId: (activeConvId) =>
    set((state) => ({ ...state, activeConvId })),

  setConversations: (conversations) =>
    set((state) => ({ ...state, conversations })),

  addConversation: (conversation) =>
    set((state) => ({
      ...state,
      conversations: [...state.conversations, conversation],
    })),

  initializeConversationStore: async () => {
    try {
      //
      const conversations =
        await backend.getAllConversationsByUserId(DefaultUserId);
      const length = conversations.length;
      const activeConvId = length > 0 ? conversations[length - 1].id : null;
      set({ activeConvId, conversations });

      // handle if there are no conversationspos
    } catch (error) {
      console.error("Failed to initialize conversation store");
      throw new Error("Failed to initialize conversation store");
    }
  },
  setAll: (activeConvId, conversations) => set({ activeConvId, conversations }),
}));

export default useConversationStore;
