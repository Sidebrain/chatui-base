import { FiEdit, FiMenu } from "react-icons/fi";

const TopBar = () => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-center gap-2 self-stretch border-b border-gray-200 bg-white  px-4 py-1">
      <FiMenu size={"24px"} />
      <div className="flex grow justify-center">ChatGPT 4</div>
      <FiEdit size={"24px"} />
    </div>
  );
};

export default TopBar;
