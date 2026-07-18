import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const messages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello 👋 How can I help you today?",
  },
  {
    id: 2,
    role: "user",
    content: "Explain React Hooks.",
  },
];

function ChatWindow() {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-10 space-y-6">

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

      </div>

      <ChatInput />

    </>
  );
}

export default ChatWindow;