import { MessageFrontendType } from "@/hooks/MessageFrontendType";
import { FiUser } from "react-icons/fi";
import Markdown from "react-markdown";

const MessageGptStyle = ({
  content,
  role,
  // completion_tokens,
  // prompt_tokens,
  // created_at,
}: MessageFrontendType) => {
  return (
    <div
      className={`flex w-full items-start gap-4 ${role === "assistant" && "bg-gray-100 pl-2"} rounded-md p-4 `}
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
      {/* <div className="flex gap-2">
        <div className="text-sm">{completion_tokens}</div>
        <div className="text-sm">{prompt_tokens}</div>
        <div className="text-sm">{created_at}</div>
      </div> */}
    </div>
  );
};

export default MessageGptStyle;
