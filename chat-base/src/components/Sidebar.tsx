import { FiEdit, FiGlobe } from "react-icons/fi";
import StartNewChatButton from "./StartNewChatButton";
import Sidebartext, { SidebarSecondaryText } from "./ui/sidebartext";
import SidebarProfile from "./SidebarProfile";

const Sidebar = () => {
  return (
    <div className="relative inline-flex h-screen flex-col items-start overflow-x-clip overflow-y-scroll bg-gray-100 px-2 py-4">
      <StartNewChatButton
        leftIcon={<FiGlobe />}
        rightIcon={<FiEdit />}
        text="ChatGpt"
      />
      <div
        id="sidebar-other-gpts"
        className="flex flex-col items-start self-stretch"
      >
        <StartNewChatButton leftIcon={<FiGlobe />} text="Lawyer GPT" />
        <StartNewChatButton leftIcon={<FiGlobe />} text="Consensus" />
        <StartNewChatButton leftIcon={<FiGlobe />} text="Explore other GPTs" />
      </div>
      <div className="flex flex-col" id="sidebar-timeline">
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
        <div className="flex flex-col items-start self-stretch py-3">
          <SidebarSecondaryText />
          <Sidebartext />
          <Sidebartext />
          <Sidebartext />
        </div>
      </div>
      <div className="sticky bottom-1 flex w-full grow self-stretch rounded-md bg-white ">
        <SidebarProfile />
      </div>
    </div>
  );
};

export default Sidebar;
