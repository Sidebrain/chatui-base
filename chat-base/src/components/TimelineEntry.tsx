import useConversationStore from "@/hooks/useConversationStore";
import { useNavigate } from "react-router-dom";

type TimelineEntryProps = {
  displayText: string | null;
  depthCount: number | null;
  date: string;
  convId: number;
};

const TimelineEntry = (timelineProps: TimelineEntryProps) => {
  const navigate = useNavigate();
  const { setActiveConvId } = useConversationStore((state) => ({
    activeConvId: state.activeConvId,
    setActiveConvId: state.setActiveConvId,
  }));
  const handleTimelineEntryClick = () => {
    console.log("clicked");
    setActiveConvId(timelineProps.convId);
    navigate("/conversation");
  };
  return (
    <>
      <div
        onClick={handleTimelineEntryClick}
        className="group flex w-full flex-col gap-2 rounded-sm bg-slate-100 p-4 text-left text-sm hover:bg-slate-500 hover:text-gray-50 md:w-2/3 "
      >
        {timelineProps.displayText ?? "New entry"}
        <div className="flex justify-between px-4">
          <p className="rounded-full bg-slate-800 px-1 text-xs text-gray-200">
            {timelineProps.depthCount}
          </p>
          <p className="text-xs text-gray-500 group-hover:text-gray-50">
            {timelineProps.date}
          </p>
        </div>
      </div>
    </>
  );
};

export default TimelineEntry;
