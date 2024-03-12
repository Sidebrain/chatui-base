import { FiGlobe } from "react-icons/fi";
import HelperCard from "../HelperCard";
import MessageGptStyle from "../MessageGptStyle";
import { useEffect, useRef } from "react";

type DisplayAreaProps = {
  messages: string[];
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
      <div className="flex grow flex-col justify-center gap-8">
        <div className="flex justify-center">
          <FiGlobe size={"40px"} />
        </div>
        <p className="text-2xl font-semibold ">How can I help you today?</p>
      </div>
      <DisplayAreaHelperPromptCards />
    </>
  );
};

const DisplayAreaMessages = ({ messages }: DisplayAreaProps) => {
  const dummyToScroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dummyToScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div
      id="conversation-area"
      className="flex w-full grow flex-col items-center gap-4 self-stretch p-4"
    >
      <div className="flex w-full flex-col items-start gap-4 self-stretch">
        {messages.map((msgText, idx) => (
          <MessageGptStyle messageText={msgText} key={idx} sender="Assistant" />
        ))}
        <div ref={dummyToScroll}></div>
      </div>
    </div>
  );
};

const DisplayArea = ({ messages }: DisplayAreaProps) => {
  return (
    <div className="flex grow flex-col justify-center gap-2 self-stretch py-2 ">
      {messages.length > 0 ? (
        <DisplayAreaMessages messages={messages} />
      ) : (
        <DisplayAreaDefaultContent />
      )}
    </div>
  );
};

export default DisplayArea;
