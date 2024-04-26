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
    <div className="flex w-full flex-col gap-2 ">
      <div
        className={`flex w-full items-start gap-4 hover:cursor-pointer ${role === "assistant" && "bg-gray-100 pl-2"} rounded-md p-4 `}
        onClick={() => setShowMetaData(!showMetaData)}
      >
        <div className="flex items-start justify-center gap-2 self-stretch">
          <FiUser size={"24px"} />
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch text-left">
          <div className="text-md self-stretch font-bold">{role}</div>
          <div className="prose max-w-none self-stretch">
            <Markdown>{content}</Markdown>
          </div>
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
