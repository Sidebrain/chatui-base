import DisplayArea from "@/components/composite/DisplayArea";
import PresentationArea from "@/components/composite/PresentationArea";
import useMessageStore from "@/hooks/useMessageStore";

const ChatSection = () => {
  const { messageList } = useMessageStore();

  return (
    <div
      id="conversation-container"
      className="no-scrollbar container relative flex h-[80vh] w-full grow flex-col items-start overflow-scroll md:w-2/3"
    >
      <PresentationArea>
        <DisplayArea messageList={messageList} />
      </PresentationArea>
    </div>
  );
};

export default ChatSection;
