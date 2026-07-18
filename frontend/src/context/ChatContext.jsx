import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [selectedChat, setSelectedChat] = useState(null);

  const [chats, setChats] = useState([]);

  const [messages, setMessages] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,

        selectedChat,
        setSelectedChat,

        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}