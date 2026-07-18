import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

import useMessages from "../../hooks/useMessages";

function ChatWindow() {
  const { messages } = useMessages();

  return (
    <>
      <div className="flex-1 overflow-y-auto p-8 space-y-5">
        {messages.map((message) => (
          <MessageBubble
            key={message._id}
            message={message}
          />
        ))}
      </div>

      <ChatInput />
    </>
  );
}

export default ChatWindow;