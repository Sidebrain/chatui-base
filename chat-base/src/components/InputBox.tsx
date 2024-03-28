import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { FiArrowUpCircle, FiPaperclip } from "react-icons/fi";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAddMessageToConversation } from "@/hooks/useBackendQueries";
import useConversationStore from "@/hooks/useConversationStore";
import { DefaultUserId } from "@/constants";

const InputBox = () => {
  // const { addMessage } = useMessageStore();
  const { activeConvId } = useConversationStore((state) => ({
    activeConvId: state.activeConvId,
  }));

  const { mutate } = useAddMessageToConversation();
  const [internalText, setInternalText] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInternalText(e.target.value);
  };

  // add the internal message to the conversation list
  const addInternalMessageToConversationList = () => {
    const newMessage = {
      content: internalText,
      role: "user" as const,
    };
    if (!activeConvId) throw new Error("No active conversation");
    mutate({
      message: newMessage,
      userId: DefaultUserId,
      convId: activeConvId,
    });
  };

  // if command + enter is pressed, add the message to the message list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.metaKey) {
      addInternalMessageToConversationList();
      e.currentTarget.form?.reset();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement> | HTMLFormElement) => {
    e.preventDefault();
    addInternalMessageToConversationList();
    e.currentTarget.reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-end gap-1 rounded-[8px] border border-gray-300 bg-white p-1 "
      >
        <Button variant={"icon"} className="px-2 ">
          <FiPaperclip size={24} />
        </Button>
        <ReactTextareaAutosize
          className="flex grow resize-none self-center focus:outline-none"
          placeholder="Type here ..."
          onChange={(e) => {
            handleInputChange(e);
          }}
          onKeyDown={handleKeyDown}
        />

        <Button type="submit" variant={"icon"} className="px-2">
          <FiArrowUpCircle size={24} />
        </Button>
      </form>
    </>
  );
};

export default InputBox;
