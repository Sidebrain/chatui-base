import { useGetResponseOfConversation } from "@/hooks/useBackendQueries";
import InputBox from "../InputBox";
import { Button } from "../ui/button";

type ChatSectionProps = {
  userId: number;
  activeConvId: number;
};

const InputTray = ({ activeConvId, userId }: ChatSectionProps) => {
  const { mutate, isPending } = useGetResponseOfConversation({
    convId: activeConvId,
    userId: userId,
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
