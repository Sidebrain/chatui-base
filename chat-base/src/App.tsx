import { useState } from "react";
import "./App.css";
import InputBox from "./components/InputBox";
import DisplayArea from "./components/composite/DisplayArea";
import PresentationArea from "./components/composite/PresentationArea";
import TopBar from "./components/composite/TopBar";
import { Button } from "./components/ui/button";
import { useMutation } from "@tanstack/react-query";
import useOpenAi from "./hooks/useOpenAIResponse";
import useSupabase from "./hooks/useSupabase";

function App() {
  const [displayMessageList, setDisplayMessageList] = useState<string[]>([]);

  // wrote up the mutation function in a custom hook
  const { getChatCompletion } = useOpenAi();

  // funciton to add entried to database
  const { addConversationEntries } = useSupabase();

  const { mutate, isPending } = useMutation({
    mutationFn: getChatCompletion,
    onSuccess: async (data) => {
      const responseMsg = data.content;
      const newDisplayMessageList = [
        ...displayMessageList,
        responseMsg ? responseMsg : "Failed in getting a response",
      ];
      setDisplayMessageList(newDisplayMessageList);

      // add the conversations to the db
      try {
        await addConversationEntries(newDisplayMessageList);
        console.log("Added conversation entries to the database");
      } catch (err) {
        console.error(
          "Failed to add conversation entries to the database",
          err,
        );
      }
    },
  });

  const handleClick = () => {
    // formatting messages into the format that OpenAI expects
    const newList = displayMessageList.map((msg) => ({
      role: "user" as const,
      content: msg,
    }));

    // Add the system prompt to the beginning of the list
    const formattedMessages = [
      { role: "system" as const, content: "You are a helpful assistant." },
      ...newList,
    ];
    mutate(formattedMessages);
  };

  return (
    <div
      id="container"
      className="container relative flex h-full w-full flex-col"
    >
      <TopBar />
      <PresentationArea>
        <DisplayArea messages={displayMessageList} />
      </PresentationArea>
      <div className="center sticky bottom-0 flex flex-col justify-end gap-4 px-2 py-2">
        <InputBox
          inputText={displayMessageList}
          setInputText={setDisplayMessageList}
        />
      </div>
      <Button onClick={handleClick}>
        {isPending ? "loading..." : "Make request"}
      </Button>
    </div>
  );
}

export default App;
