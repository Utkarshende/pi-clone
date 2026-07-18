import { FiPlus, FiSettings } from "react-icons/fi";

const chats = [
  {
    id: 1,
    title: "React Interview Questions",
  },
  {
    id: 2,
    title: "Node Authentication",
  },
  {
    id: 3,
    title: "Gym Diet Plan",
  },
];

function Sidebar() {
  return (
    <div className="w-72 bg-[#171717] flex flex-col">

      <div className="p-4">
        <button className="w-full flex items-center justify-center gap-2 bg-[#343541] hover:bg-[#40414f] transition rounded-lg py-3">
          <FiPlus />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">

        {chats.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left p-3 rounded-lg hover:bg-[#2a2b32] mb-2"
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