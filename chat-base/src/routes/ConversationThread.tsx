import { useEffect } from "react";
import ChatSection from "../sections/ChatSection";
import TopBar from "../components/composite/TopBar";
import { useGetMessagesFromConversation } from "../hooks/useBackendQueries";
import useMessageStore from "../hooks/useMessageStore";
import { DefaultUserId } from "../constants";
import useConversationStore from "../hooks/useConversationStore";
import InputTray from "../components/composite/InputTray";

function ConversationThread() {
  const userId = DefaultUserId; // STATE

  // ############### Zustand Store ###############
  const { activeConvId } = useConversationStore((state) => ({
    activeConvId: state.activeConvId,
  }));

  const loadNewMessageList = useMessageStore(
    (state) => state.loadNewMessageList,
  );

  // ################################################

  const { data: newMessageList } = useGetMessagesFromConversation({
    userId,
    convId: activeConvId as number,
  });

  // ############### useEffects ###############
  useEffect(() => {
    // to load the messages of the conversation when the active conversation changes
    if (newMessageList) loadNewMessageList(newMessageList);
  }, [activeConvId, newMessageList, userId, loadNewMessageList]);

  // #######################################################
  if (!activeConvId) return <div>loading</div>;
  return (
    <div
      id="app-parent"
      className="relative flex h-full w-full flex-col items-center"
    >
      <div className="flex w-full grow flex-col ">
        <TopBar />
        <ChatSection />
      </div>
      <div className="center sticky bottom-0 flex w-full flex-col gap-4 px-2 py-2 md:w-2/3">
        <InputTray activeConvId={activeConvId} userId={userId} />
      </div>
    </div>
  );
}

export default ConversationThread;
