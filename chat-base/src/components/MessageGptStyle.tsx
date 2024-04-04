import { MessageFrontendType } from "@/hooks/useMessageStore";
import { FiUser } from "react-icons/fi";
import Markdown from "react-markdown";

const MessageGptStyle = ({ content, role }: MessageFrontendType) => {
  return (
    <div className="w-full items-start gap-4">
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
  );
};

export default MessageGptStyle;
