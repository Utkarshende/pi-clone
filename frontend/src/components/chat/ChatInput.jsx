import { useState } from "react";
import { FiSend } from "react-icons/fi";

function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(message);

    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-700 p-5"
    >
      <div className="flex items-center gap-3">

        <input
          type="text"
          placeholder="Message AI..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="flex-1 bg-[#343541] rounded-xl px-5 py-4 outline-none"
        />

        <button
          className="bg-blue-600 p-4 rounded-xl hover:bg-blue-700"
        >
          <FiSend />
        </button>

      </div>
    </form>
  );
}

export default ChatInput;