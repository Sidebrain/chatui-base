import { FiEdit, FiGlobe } from "react-icons/fi";
import StartNewChatButton from "./StartNewChatButton";
import { ConversationBackendType } from "@/services/backendService";
import SidebarThreadEntry from "./composite/SidebarThreadEntry";

type SidebarProps = {
  conversations: ConversationBackendType[];
};

const Sidebar = ({ conversations }: SidebarProps) => {
  const convertDateToString = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour12: true,
    });
  };
  return (
    <div className="relative z-10 flex h-screen w-4/5 flex-col justify-stretch overflow-x-clip overflow-y-scroll rounded-md bg-gray-200 px-2 py-4">
      <StartNewChatButton
        leftIcon={<FiGlobe />}
        rightIcon={<FiEdit />}
        text="ChatGpt"
      />

      <div className="flex flex-col items-center justify-start gap-4 p-2 focus:cursor-pointer">
        {conversations &&
          conversations.map((conv) => (
            <SidebarThreadEntry
              key={conv.id}
              displayText={conv.messages[0]?.content}
              date={convertDateToString(conv.updated_at)}
              depthCount={conv.messages.length}
              convId={conv.id}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
