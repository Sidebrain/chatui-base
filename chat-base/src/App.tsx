import { useEffect, useState } from "react";
import "./App.css";
import ChatSection from "./sections/ChatSection";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/composite/TopBar";
import { useGetMessagesFromConversation } from "./hooks/useBackendQueries";
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
    <div
      id="app-parent"
      className="relative flex h-full w-full flex-col justify-stretch "
    >
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
                  className="flex items-center justify-start gap-4 p-2 focus:cursor-pointer"
                  onClick={() => setActiveConvId(conv.id)}
                >
                  <div className="flex w-full flex-col gap-2 rounded-sm bg-slate-100 p-1 text-left text-sm ">
                    {conv.messages[0]?.content ?? "New entry"}
                    <div className="flex justify-between px-2">
                      <p className="rounded-full bg-slate-800 px-1 text-xs text-gray-200">
                        {conv.messages.length}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(conv.created_at).toLocaleDateString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          year: "2-digit",
                          month: "short",
                          day: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
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
