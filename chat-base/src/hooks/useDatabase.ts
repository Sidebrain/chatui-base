import ax from "@/services/axiosClient";
import useMessageStore, { MessageType } from "./useMessageStore";

const useDatabase = () => {
  const { addMessage, messageList } = useMessageStore();
  const addMessagestoDatabase = async (data: MessageType | null) => {
    let dataPayload;
    if (!data || !data.content) {
      dataPayload = {
        content: "Failed in getting a response" as string,
        role: "assistant" as const,
      };
    } else {
      dataPayload = {
        content: data.content as string,
        role: data.role,
      };
    }
    console.log("dataPayload", dataPayload);
    addMessage(dataPayload);
    console.log("Added message to the message store");
    console.log("messageList", messageList);
    try {
      // await addConversationEntries(newDisplayMessageList);
      await ax.post("/converse2", [...messageList, dataPayload]);
      console.log("Added conversation entries to the database");
    } catch (err) {
      console.error("Failed to add conversation entries to the database", err);
    }
  };
  return { addMessagestoDatabase };
};

export default useDatabase;
