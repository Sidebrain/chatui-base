import { DefaultUserId } from "@/constants";
import { useCreateConversationForUserId } from "@/hooks/useBackendQueries";
import { FiEdit, FiMenu } from "react-icons/fi";

type TopBarProps = {
  handleMenuClick: () => void;
};

const TopBar = ({ handleMenuClick }: TopBarProps) => {
  const { mutate } = useCreateConversationForUserId(DefaultUserId);
  const handleNewChatClick = () => {
    mutate();
  };
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-center gap-2 self-stretch border-b border-gray-200 bg-white px-4 py-1">
      <FiMenu
        size={"24px"}
        className="focus:cursor-pointer"
        onClick={handleMenuClick}
      />
      <div className="flex grow justify-center">ChatGPT 4</div>
      <FiEdit size={"24px"} onClick={handleNewChatClick} />
    </div>
  );
};

export default TopBar;
