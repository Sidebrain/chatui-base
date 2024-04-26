import { DefaultUserId } from "@/constants";
import { useCreateConversationForUserId } from "@/hooks/useBackendQueries";
import { FiEdit, FiMenu } from "react-icons/fi";
import ModelSwitcher from "./ModelSwitcher";

type TopBarProps = {
  handleMenuClick: () => void;
};

const TopBar = ({ handleMenuClick }: TopBarProps) => {
  const { mutate } = useCreateConversationForUserId(DefaultUserId);
  const handleNewChatClick = () => {
    mutate();
  };
  return (
    <div className=" sticky top-4 z-10 flex w-full items-center justify-between gap-2 rounded-lg p-4  backdrop-blur ">
      <div className="rounded-md bg-gray-50 p-1 focus:cursor-pointer">
        <FiMenu size={"24px"} onClick={handleMenuClick} />
      </div>
      <div className="flex justify-center rounded-md bg-gray-50">
        <ModelSwitcher />
      </div>
      <div className="flex rounded-md bg-white p-2">
        <FiEdit size={"24px"} onClick={handleNewChatClick} />
      </div>
    </div>
  );
};

export default TopBar;
