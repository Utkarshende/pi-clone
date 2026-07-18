import Sidebar from "../sidebar/Sidebar";
import ChatWindow from "../chat/ChatWindow";

function Layout() {
  return (
    <div className="flex h-screen bg-[#202123] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}

export default Layout;