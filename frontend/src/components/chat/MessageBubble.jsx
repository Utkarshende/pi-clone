function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`rounded-2xl px-5 py-4 max-w-4xl whitespace-pre-wrap ${
          isUser
            ? "bg-blue-600"
            : "bg-[#343541]"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default MessageBubble;