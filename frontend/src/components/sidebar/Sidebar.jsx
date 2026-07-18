import { FiPlus, FiSettings } from "react-icons/fi";

import useChats from "../../hooks/useChats";

function Sidebar() {
  const { chats, addChat } = useChats();

  return (
    <div className="w-72 bg-[#171717] flex flex-col">

      <div className="p-4">

        <button
          onClick={addChat}
          className="w-full bg-[#343541] rounded-lg py-3 hover:bg-[#40414f]"
        >
          <div className="flex items-center justify-center gap-2">

            <FiPlus />

            New Chat

          </div>

        </button>

      </div>

      <div className="flex-1 overflow-y-auto p-3">

        {chats.map((chat) => (
          <button
            key={chat._id}
            className="w-full text-left rounded-lg hover:bg-[#2d2d2d] p-3 mb-2"
          >
            {chat.title}
          </button>
        ))}

      </div>

      <div className="border-t border-gray-700 p-4">

        <button className="flex items-center gap-2">

          <FiSettings />

          Settings

        </button>

      </div>

    </div>
  );
}

export default Sidebar;