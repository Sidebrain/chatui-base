import { useEffect, useState } from "react";
import "./App.css";
import ChatSection from "./sections/ChatSection";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/composite/TopBar";
import {
  useGetConversationsByUserId,
  useGetMessagesFromConversation,
} from "./hooks/useBackendQueries";
import useMessageStore from "./hooks/useMessageStore";
import { DefaultUserId } from "./constants";
import useConversationStore from "./hooks/useConversationStore";

function App() {
  const [userId, setUserId] = useState<number>(DefaultUserId); // STATE
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  const {
    initializeConversationStore,
    conversations,
    activeConvId,
    setActiveConvId,
  } = useConversationStore((state) => ({
    initializeConversationStore: state.initializeConversationStore,
    conversations: state.conversations,
    activeConvId: state.activeConvId,
    setActiveConvId: state.setActiveConvId,
  }));

  const loadNewMessageList = useMessageStore(
    (state) => state.loadNewMessageList,
  );


  const { data: newMessageList } = useGetMessagesFromConversation({
    userId,
    convId: activeConvId,
  });

  useEffect(() => {
    initializeConversationStore();
  }, [initializeConversationStore]);

  useEffect(() => {
    if (newMessageList) loadNewMessageList(newMessageList);
  }, [activeConvId, newMessageList, userId, loadNewMessageList]);

  if (!activeConvId) return <div>loading</div>;
  return (
    <div className="relative flex h-screen w-screen flex-col">
      <TopBar handleMenuClick={() => setToggleSidebar(!toggleSidebar)} />
      {toggleSidebar && (
        <div
          className="absolute left-0 top-0 z-10 flex h-full w-full"
          onClick={() => setToggleSidebar(!toggleSidebar)}
        >
          <Sidebar>
            {conversations &&
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-start gap-4 p-2"
                  onClick={() => setActiveConvId(conv.id)}
                >
                  <div className="text-sm">{conv.summary}</div>
                </div>
              ))}
          </Sidebar>
        </div>
      )}
      <ChatSection convId={activeConvId} userId={userId} />
    </div>
  );
}

export default App;
