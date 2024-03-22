import { FiEdit, FiGlobe } from "react-icons/fi";
import StartNewChatButton from "./StartNewChatButton";
import Sidebartext, { SidebarSecondaryText } from "./ui/sidebartext";
import SidebarProfile from "./SidebarProfile";

const Sidebar = () => {
  return (
    <div className="relative z-10 flex h-full w-2/3 flex-col justify-stretch overflow-x-clip overflow-y-scroll bg-gray-200 px-2 py-4">
      <StartNewChatButton
        leftIcon={<FiGlobe />}
        rightIcon={<FiEdit />}
        text="ChatGpt"
      />
      <div className="flex bg-gray-600">Hello</div>
      <div className="absolute bottom-0 flex rounded-md bg-white ">
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Sidebar;
