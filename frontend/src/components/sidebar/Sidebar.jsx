import { useEffect } from "react";
import { FiPlus } from "react-icons/fi";

import { getChats, createChat } from "../../services/chat.service";

import { useChat } from "../../context/ChatContext";

function Sidebar() {
  const {
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
  } = useChat();

  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    try {
      const data = await getChats();

      setChats(data);

      if (data.length > 0) {
        setSelectedChat(data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleNewChat() {
    try {
      const chat = await createChat();

      setChats((prev) => [chat, ...prev]);

      setSelectedChat(chat);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-72 bg-[#171717] flex flex-col">
      <div className="p-4">
        <button
          onClick={handleNewChat}
          className="w-full flex items-center justify-center gap-2 bg-[#343541] hover:bg-[#40414f] rounded-lg py-3"
        >
          <FiPlus />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {chats.map((chat) => (
          <button
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`w-full text-left p-3 rounded-lg mb-2 ${
              selectedChat?._id === chat._id
                ? "bg-[#40414f]"
                : "hover:bg-[#2d2d2d]"
            }`}
          >
            {chat.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;