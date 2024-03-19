import InputBox from "@/components/InputBox";
import DisplayArea from "@/components/composite/DisplayArea";
import PresentationArea from "@/components/composite/PresentationArea";
import TopBar from "@/components/composite/TopBar";
import { Button } from "@/components/ui/button";
import useDatabase from "@/hooks/useDatabase";
import useMessageStore from "@/hooks/useMessageStore";
import useOpenAi from "@/hooks/useOpenAIResponse";
import { useMutation } from "@tanstack/react-query";

const ChatSection = () => {
  const { messageList } = useMessageStore();
  const { getChatCompletion } = useOpenAi();
  const { addMessagestoDatabase } = useDatabase();

  const { mutate, isPending } = useMutation({
    mutationFn: getChatCompletion,
    onSuccess: async (data) => addMessagestoDatabase(data),
  });

  const handleClick = () => {
    mutate(messageList);
  };

  return (
    <div
      id="container"
      className="container relative flex h-full w-full flex-col"
    >
      <TopBar />
      <PresentationArea>
        <DisplayArea messageList={messageList} />
      </PresentationArea>
      <div className="center sticky bottom-0 flex flex-col justify-end gap-4 px-2 py-2">
        <InputBox />
      </div>
      <Button onClick={handleClick}>
        {isPending ? "loading..." : "Make request"}
      </Button>
    </div>
  );
};

export default ChatSection;
