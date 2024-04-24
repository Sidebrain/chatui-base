import { FiGlobe } from "react-icons/fi";
import HelperCard from "../HelperCard";
import MessageGptStyle from "../MessageGptStyle";
import { useEffect, useRef } from "react";
import { MessageFrontendType } from "@/hooks/MessageFrontendType";

type DisplayMessagesProps = {
  messageList: MessageFrontendType[];
};

const DisplayAreaHelperPromptCards = () => {
  return (
    <div className="flex flex-wrap content-center items-end justify-center gap-2 self-stretch px-4">
      <HelperCard />
      <HelperCard />
    </div>
  );
};

const DisplayAreaDefaultContent = () => {
  return (
    <>
      <div
        id="default-no-messages"
        className="flex w-full flex-col justify-center gap-8"
      >
        <div className="flex justify-center">
          <FiGlobe size={"40px"} />
        </div>
        <p className="text-2xl font-semibold ">How can I help you today?</p>
      </div>
      <DisplayAreaHelperPromptCards />
    </>
  );
};

const DisplayAreaMessages = ({ messageList }: DisplayMessagesProps) => {
  const dummyToScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummyToScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);
  return (
    <div
      id="conversation-area"
      className="flex w-full flex-col items-center gap-4 p-4"
    >
      <div className="flex w-full flex-col items-start gap-4 self-stretch">
        {messageList.map((msg, idx) => (
          <MessageGptStyle key={idx} {...msg} />
        ))}
        <div ref={dummyToScroll}></div>
      </div>
    </div>
  );
};

const DisplayArea = ({ messageList }: DisplayMessagesProps) => {
  return (
    <div className="flex w-full grow flex-col justify-center gap-2 py-2 ">
      {messageList.length > 0 ? (
        <DisplayAreaMessages messageList={messageList} />
      ) : (
        <DisplayAreaDefaultContent />
      )}
    </div>
  );
};

export default DisplayArea;
