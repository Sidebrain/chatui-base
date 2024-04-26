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
      <FiMenu
        size={"24px"}
        className="focus:cursor-pointer"
        onClick={handleMenuClick}
      />
      <div className="flex justify-center">
        <ModelSwitcher />
      </div>
      <FiEdit size={"24px"} onClick={handleNewChatClick} />
    </div>
  );
};

export default TopBar;
