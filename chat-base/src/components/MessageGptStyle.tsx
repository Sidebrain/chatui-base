import { MessageFrontendType } from "@/hooks/MessageFrontendType";
import { FiUser } from "react-icons/fi";
import Markdown from "react-markdown";
import MetaDataBand from "./composite/MetaDataBand";
import { useState } from "react";

const MessageGptStyle = ({
  content,
  role,
  completion_tokens,
  prompt_tokens,
  // created_at,
  llm,
}: MessageFrontendType) => {
  const [showMetaData, setShowMetaData] = useState<boolean>(false);
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-md p-4 ${role === "assistant" && "bg-gray-100 hover:cursor-pointer "}`}
      onClick={() => setShowMetaData(!showMetaData)}
    >
      <div className={`flex w-full items-start gap-4 rounded-md `}>
        <FiUser size={"24px"} />
        <div className="text-md font-bold">{role}</div>
      </div>
      <div className="flex w-full gap-2 text-left ">
        {/* <div className=" prose max-w-[60vw] md:max-w-[37vw]"> */}
        <div className=" prose max-w-[100ch] prose-li:list-outside">
          <Markdown>{content}</Markdown>
          {/* {content} */}
        </div>
      </div>
      {showMetaData && role === "assistant" && llm && (
        <MetaDataBand
          completion_tokens={completion_tokens}
          prompt_tokens={prompt_tokens}
          llm={llm}
        />
      )}
    </div>
  );
};

export default MessageGptStyle;
