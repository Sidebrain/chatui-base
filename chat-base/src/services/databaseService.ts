import {
  AuthorizedConversationRequest,
  MessageBackendType,
  MessageFrontendType,
} from "@/hooks/useMessageStore";
import ax from "@/services/axiosClient";

const backend = {
  addMessagetoDatabase: async () => {},

  getResponseOfConversation: async ({
    convId,
    userId,
  }: AuthorizedConversationRequest) => {
    //
    try {
      //
      const response = await ax.post<MessageBackendType>("/converse/v1", {
        params: {
          user_id: userId,
          conv_id: convId,
        },
      });
      return response.data;
    } catch (err) {
      throw new Error(`Failed to get response from backend. err: ${err}`);
    }
  },

  getAllMessagesFromConversation: async ({
    convId,
    userId,
  }: AuthorizedConversationRequest) => {
    try {
      const response = await ax.post<MessageBackendType[]>(
        "/converse/get_all_messages_of_conversation",
        {
          params: {
            user_id: userId,
            conv_id: convId,
          },
        },
      );
      const messages: MessageFrontendType[] = response.data.map((m) => ({
        content: m.content,
        role: m.role,
      }));
      return messages;
    } catch (err) {
      throw new Error("Failed to fetch messages from the database");
    }
  },
};

export default backend;
