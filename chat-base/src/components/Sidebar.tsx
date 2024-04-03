import { FiEdit, FiGlobe } from "react-icons/fi";
import StartNewChatButton from "./StartNewChatButton";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="relative z-10 flex h-full w-4/5 flex-col justify-stretch overflow-x-clip overflow-y-scroll bg-gray-200 px-2 py-4">
      <StartNewChatButton
        leftIcon={<FiGlobe />}
        rightIcon={<FiEdit />}
        text="ChatGpt"
      />
      {children}
    </div>
  );
};

export default Sidebar;
