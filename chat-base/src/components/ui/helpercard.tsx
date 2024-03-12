import { FiArrowUp } from "react-icons/fi";

type HelperCardProps = {
  title: string;
  description: string;
  handleClick?: () => void;
};

const helpercard = ({ title, description, handleClick }: HelperCardProps) => {
  return (
    <div className="max-w-100 group flex min-w-80 items-center gap-2 rounded-[8px] border border-gray-300 px-4 py-3 hover:bg-gray-100 ">
      <div className="flex flex-col items-start justify-center gap-2">
        <p className="">{title}</p>
        <p className="" id="helper-secondary-text">
          {description}
        </p>
      </div>
      <div
        className="hidden cursor-pointer items-start gap-2 rounded-[8px] border border-gray-300 p-1 group-hover:block"
        onClick={
          handleClick ??
          (() => console.log("helper-card clicked, but no handler provided"))
        }
      >
        <FiArrowUp className="text-gray-500" />
      </div>
    </div>
  );
};

export default helpercard;
