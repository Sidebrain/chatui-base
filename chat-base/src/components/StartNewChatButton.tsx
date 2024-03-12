type NewChatButtonProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
};

const NewChatButton = ({ leftIcon, rightIcon, text }: NewChatButtonProps) => {
  return (
    <div className="group flex items-center gap-4 rounded-[8px] p-2 hover:bg-gray-200">
      {leftIcon && leftIcon}
      <div className="grow overflow-hidden text-sm">{text}</div>
      {rightIcon && rightIcon}
    </div>
  );
};

export default NewChatButton;
