import { FiUser } from "react-icons/fi";
import Markdown from "react-markdown";

type MessageGptStyleProps = {
  messageText: string;
  sender: "Anudeep" | "Assistant";
};
const MessageGptStyle = ({ messageText, sender }: MessageGptStyleProps) => {
  return (
    <div className="w-full items-start gap-4">
      <div className="flex items-start justify-center gap-2 self-stretch">
        <FiUser size={"24px"} />
      </div>
      <div className="flex flex-col items-start gap-2 self-stretch text-left">
        <div className="text-md self-stretch font-bold">{sender}</div>
        <div className="prose max-w-none self-stretch">
          <Markdown>{messageText}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default MessageGptStyle;
