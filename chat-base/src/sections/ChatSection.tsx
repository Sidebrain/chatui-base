import InputBox from "@/components/InputBox";
import DisplayArea from "@/components/composite/DisplayArea";
import PresentationArea from "@/components/composite/PresentationArea";
import { Button } from "@/components/ui/button";
import { useGetResponseOfConversation } from "@/hooks/useBackendQueries";
import useMessageStore from "@/hooks/useMessageStore";

type ChatSectionProps = {
  userId: number;
  convId: number;
};

const ChatSection = ({ convId, userId }: ChatSectionProps) => {
  const { messageList } = useMessageStore();

  const { mutate, isPending } = useGetResponseOfConversation({
    convId,
    userId,
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <div
      id="conversation-container"
      className="container relative flex h-full w-full flex-col"
    >
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
