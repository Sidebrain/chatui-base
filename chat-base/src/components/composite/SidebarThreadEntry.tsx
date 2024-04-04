import useConversationStore from "@/hooks/useConversationStore";

type SidebarThreadEntryProps = {
  displayText: string | null;
  depthCount: number | null;
  date: string;
  convId: number;
};
const SidebarThreadEntry = ({
  date,
  depthCount,
  displayText,
  convId,
}: SidebarThreadEntryProps) => {
  const { setActiveConvId } = useConversationStore((state) => ({
    setActiveConvId: state.setActiveConvId,
  }));
  return (
    <>
      <div
        onClick={() => setActiveConvId(convId)}
        className="flex w-full flex-col gap-2 rounded-sm bg-slate-100 p-1 text-left text-sm hover:bg-slate-500 "
      >
        {displayText ?? "New entry"}
        <div className="flex justify-between px-2">
          <p className="rounded-full bg-slate-800 px-1 text-xs text-gray-200">
            {depthCount}
          </p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </>
  );
};

export default SidebarThreadEntry;
