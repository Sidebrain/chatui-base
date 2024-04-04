import { useEffect, useState } from "react";
import "./App.css";
import ChatSection from "./sections/ChatSection";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/composite/TopBar";
import { useGetMessagesFromConversation } from "./hooks/useBackendQueries";
import useMessageStore from "./hooks/useMessageStore";
import { DefaultUserId } from "./constants";
import useConversationStore from "./hooks/useConversationStore";
import InputTray from "./components/composite/InputTray";

function App() {
  const userId = DefaultUserId; // STATE
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);

  const { initializeConversationStore, conversations, activeConvId } =
    useConversationStore((state) => ({
      initializeConversationStore: state.initializeConversationStore,
      conversations: state.conversations,
      activeConvId: state.activeConvId,
    }));

  const loadNewMessageList = useMessageStore(
    (state) => state.loadNewMessageList,
  );

  const { data: newMessageList } = useGetMessagesFromConversation({
    userId,
    convId: activeConvId as number,
  });

  useEffect(() => {
    initializeConversationStore();
  }, [initializeConversationStore]);

  useEffect(() => {
    if (newMessageList) loadNewMessageList(newMessageList);
  }, [activeConvId, newMessageList, userId, loadNewMessageList]);

  if (!activeConvId) return <div>loading</div>;
  return (
    <div
      id="app-parent"
      className="relative flex h-full w-full flex-col justify-stretch "
    >
      {toggleSidebar && (
        <div
          id="sidebar"
          className="absolute left-0 top-0 z-20 flex h-full w-full "
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <Sidebar conversations={conversations} />
        </div>
      )}
      <div className="flex grow flex-col">
        <TopBar handleMenuClick={() => setToggleSidebar(!toggleSidebar)} />
        <ChatSection />
      </div>
      <div className="center sticky bottom-0 flex flex-col justify-end gap-4 px-2 py-2">
        <InputTray activeConvId={activeConvId} userId={userId} />
      </div>
    </div>
  );
}

export default App;
