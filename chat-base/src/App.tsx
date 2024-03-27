import { useState } from "react";
import "./App.css";
import ChatSection from "./sections/ChatSection";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/composite/TopBar";
import {
  useGetConversationsByUserId,
  useGetMessagesFromConversation,
} from "./hooks/useBackendQueries";
import useMessageStore from "./hooks/useMessageStore";

function App() {
  const [userId, setUserId] = useState<number>(1);
  const {
    data: conversations,
    isFetching,
    isSuccess,
  } = useGetConversationsByUserId(userId);
  const [activeConvId, setActiveConvId] = useState<number>(
    conversations ? conversations[0].id : 0,
  );
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const { loadNewMessageList } = useMessageStore();

  const { data: newMessageList } = useGetMessagesFromConversation({
    userId,
    convId: activeConvId,
  });

  if (newMessageList && newMessageList.length > 0) {
    loadNewMessageList(newMessageList);
  }

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
