import {
  AuthorizedAIResponseRequestType,
  AuthorizedConversationRequestType,
} from "@/types/BackendDatabaseModelTypes";
import { LLMType, MessageBackendType } from "@/types/BackendDatabaseModelTypes";
import { MessageFrontendType } from "@/hooks/MessageFrontendType";
import ax from "@/services/axiosClient";

export type AddMessagetoConversationType = {
  message: MessageFrontendType;
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

const backend = {
  addMessagetoConversation: async ({
    message,
    convId,
    userId,
  }: AddMessagetoConversationType) => {
    //
    try {
      const response = await ax.post<MessageBackendType>(
        "/converse/add_message",
        message,
        {
          params: {
            user_id: userId,
            conv_id: convId,
          },
        },
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to add message to the database. err: ${err}`);
    }
  },

  getResponseOfConversation: async ({
    convId,
    userId,
    selectedModel,
  }: AuthorizedAIResponseRequestType) => {
    try {
      const response = await ax.post<MessageBackendType>(
        "/converse/v1",
        selectedModel,
        {
          params: {
            user_id: userId,
            conv_id: convId,
          },
        },
      );
      return response.data;
    } catch (err) {
      throw new Error(`Failed to get response from backend. err: ${err}`);
    }
  },

  getAllMessagesOfConversation: async ({
    convId,
    userId,
  }: AuthorizedConversationRequestType) => {
    try {
      const response = await ax.get<MessageBackendType[]>(
        "/converse/get_all_messages_of_conversation",
        {
          params: {
            user_id: userId,
            conv_id: convId,
          },
        },
      );
      // console.log("response", response);
      // const messages: MessageFrontendType[] = response.data.map((m) => ({
      //   content: m.content,
      //   role: m.role,
      // }));
      const messages: MessageFrontendType[] = response.data;
      return messages;
    } catch (err) {
      throw new Error("Failed to fetch messages from the database");
    }
  },

  getAllConversationsByUserId: async (userId: number) => {
    try {
      const response = await ax.post<ConversationBackendType[]>(
        "/converse/get_all_conversations_by_user_id",
        {},
        {
          params: {
            user_id: userId,
          },
        },
      );
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch messages from the database");
    }
  },

  createConversationForUserId: async (userId: number) => {
    try {
      const newConversation = await ax.post<ConversationBackendType>(
        "/converse/create_conversation",
        {},
        {
          params: {
            user_id: userId,
          },
        },
      );
      return newConversation.data;
    } catch (err) {
      throw new Error("Failed to create/retrieve empty conversation");
    }
  },

  getAvailableLLMModels: async () => {
    try {
      const response = await ax.get<LLMType[]>("/converse/models");
      return response.data;
    } catch (err) {
      throw new Error("Failed to fetch models from the database");
    }
  },
};

export default backend;
