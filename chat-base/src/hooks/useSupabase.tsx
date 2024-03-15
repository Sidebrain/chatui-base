import supabase from "../services/supabaseClient";

const useSupabase = () => {
  const addConversationEntries = async (messageList: string[]) => {
    // format the messages to how supabase expects them
    const formattedMsgs = messageList.map((msg) => ({
      message: msg,
      sender: "user",
    }));
    console.log("messaged being added to the database", formattedMsgs);

    // add one or more conversation entries to the database
    const { error } = await supabase
      .from("Conversations")
      .insert(formattedMsgs);
    if (error) {
      console.log("error loading messages into db", error);
      throw new Error(`Failed to add conversation entries. Error: ${error}`);
    }
  };

  return { addConversationEntries };
};

export default useSupabase;
