import { FiArchive, FiMoreHorizontal } from "react-icons/fi";
import { Button } from "./button";

const Sidebartext = () => {
  return (
    <div className="max-w-205  group flex shrink-0 items-center justify-center gap-2 p-2 hover:rounded-[8px] hover:bg-gray-200">
      <div className="" id="sidebar-item-text">
        Tailwind Layout: Sticky Input
      </div>
      <div className="invisible flex items-center justify-center gap-2 group-hover:visible">
        <Button variant={"icon"} className="p-0">
          <FiArchive size={16} />
        </Button>
        <Button variant={"icon"} className="p-0">
          <FiMoreHorizontal size={16} />
        </Button>
      </div>
    </div>
  );
};

const SidebarSecondaryText = () => {
  return <div id="sidebar-timeline-text">Previous 30 days</div>;
};

export default Sidebartext;
export { SidebarSecondaryText };
