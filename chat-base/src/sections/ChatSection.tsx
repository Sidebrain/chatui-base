import DisplayArea from "@/components/composite/DisplayArea";
import PresentationArea from "@/components/composite/PresentationArea";
import useMessageStore from "@/hooks/useMessageStore";

const ChatSection = () => {
  const { messageList } = useMessageStore();

  return (
    <div
      id="conversation-container"
      className="container relative flex h-full w-full grow flex-col"
    >
      <PresentationArea>
        <DisplayArea messageList={messageList} />
      </PresentationArea>
    </div>
  );
};

export default ChatSection;
