import { useState } from "react";
import "./App.css";
import ChatSection from "./sections/ChatSection";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/composite/TopBar";

function App() {
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  return (
    <div className="relative flex h-screen w-screen flex-col">
      <TopBar />
      {toggleSidebar && (
        // <div
        //   className="absolute left-0 top-0 z-10 flex h-full w-full"
        //   onClick={() => setToggleSidebar(!toggleSidebar)}
        // >
        <Sidebar />
        // </div>
      )}
      {/* <ChatSection /> */}
    </div>
  );
}

export default App;
