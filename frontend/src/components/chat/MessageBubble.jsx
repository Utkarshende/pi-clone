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
        className={`max-w-3xl px-5 py-4 rounded-2xl whitespace-pre-wrap ${
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