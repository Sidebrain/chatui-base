import { useGetResponseOfConversation } from "@/hooks/useBackendQueries";
import InputBox from "../InputBox";
import { Button } from "../ui/button";
import useMetaContextStore from "@/hooks/useMetaContextStore";

type ChatSectionProps = {
  userId: number;
  activeConvId: number;
};

const InputTray = ({ activeConvId, userId }: ChatSectionProps) => {
  const { selectedModel } = useMetaContextStore((state) => ({
    selectedModel: state.selectedModel,
  }));
  // handle case where no model is selected
  if (!selectedModel) throw new Error("No model selected");

  const { mutate, isPending } = useGetResponseOfConversation({
    convId: activeConvId,
    userId: userId,
    selectedModel,
  });
  return (
    <>
      <div className="mb-2 flex flex-col gap-2 pt-2">
        <Button className="self-center" onClick={() => mutate()}>
          {isPending ? "..." : "Ask AI"}
        </Button>
        <InputBox />
      </div>
    </>
  );
};

export default InputTray;
