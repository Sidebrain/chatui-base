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

function App() {
  const [userId, setUserId] = useState<number>(1); // STATE

  const { data: conversations } = useGetConversationsByUserId(userId);
  const [convList, setConvList] = useState(conversations); // STATE

  const { loadNewMessageList } = useMessageStore();

  // setting the active conversation id to the first conversation id
  // this needs to be updated to be the empty conv
  const [activeConvId, setActiveConvId] = useState<number>(
    convList && convList.length > 0 ? convList[0].id : 0,
  );
  const { data: newMessageList } = useGetMessagesFromConversation({
    userId,
    convId: activeConvId,
  });

  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);

  useEffect(() => {
    if (newMessageList) loadNewMessageList(newMessageList);
  }, [activeConvId, newMessageList, userId]);

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
