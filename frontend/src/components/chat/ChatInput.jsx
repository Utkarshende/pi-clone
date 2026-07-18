import { useState } from "react";

import { sendMessage } from "../../services/message.service";

import { useChat } from "../../context/ChatContext";

function ChatInput() {
  const [text, setText] = useState("");

  const {
    selectedChat,
    messages,
    setMessages,
  } = useChat();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    if (!selectedChat) return;

    try {
      const data = await sendMessage(
        selectedChat._id,
        text
      );

      setMessages([
        ...messages,
        data.userMessage,
        data.assistantMessage,
      ]);

      setText("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-gray-700 p-5"
    >
      <div className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-[#343541] rounded-xl px-5 py-4 text-white outline-none"
        />

        <button className="bg-blue-600 rounded-xl px-8">
          Send
        </button>
      </div>
    </form>
  );
}

export default ChatInput;