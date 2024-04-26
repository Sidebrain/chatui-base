import TimelineEntry from "@/components/TimelineEntry";
import { DefaultUserId } from "@/constants";
import { useCreateConversationForUserId } from "@/hooks/useBackendQueries";
import useConversationStore from "@/hooks/useConversationStore";
import useMetaContextStore from "@/hooks/useMetaContextStore";
import { useEffect } from "react";
import { FiEdit, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AllConversationsPage = () => {
  const navigate = useNavigate();
  const { initializeConversationStore, conversations } = useConversationStore(
    (state) => ({
      initializeConversationStore: state.initializeConversationStore,
      conversations: state.conversations,
      activeConvId: state.activeConvId,
    }),
  );

  const { initializeMetaContextStore } = useMetaContextStore((state) => ({
    initializeMetaContextStore: state.initializeMetaContextStore,
  }));

  const { mutate } = useCreateConversationForUserId(DefaultUserId);
  const handleNewChatClick = () => {
    mutate();
    navigate("/conversation");
  };

  useEffect(() => {
    initializeConversationStore();
  }, [initializeConversationStore]);

  useEffect(() => {
    // to get the available models and set the default model
    console.log("useMetaContextStore");
    initializeMetaContextStore();
  }, [initializeMetaContextStore]);

  const convertDateToString = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "numeric",
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 p-4">
      <div className="flex w-full justify-between md:w-2/3">
        <div className="flex rounded-md bg-gray-50 p-1 focus:cursor-pointer">
          <FiHome size={"24px"} onClick={() => {}} />
        </div>
        <h2 className="flex text-2xl font-semibold">All Conversations</h2>
        <div className="flex rounded-md bg-gray-50 p-1 focus:cursor-pointer">
          <FiEdit size={"24px"} onClick={handleNewChatClick} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {conversations &&
          conversations.map((conv) => (
            <TimelineEntry
              key={conv.id}
              displayText={conv.messages[0]?.content}
              date={convertDateToString(conv.updated_at)}
              depthCount={conv.messages.length}
              convId={conv.id}
            />
          ))}
      </div>
    </div>
  );
};

export default AllConversationsPage;
