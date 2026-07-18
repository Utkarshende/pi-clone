import { useEffect } from "react";

import { useChat } from "../context/ChatContext";

import {
  getMessages,
} from "../services/message.service";

function useMessages() {
  const {
    selectedChat,

    messages,
    setMessages,
  } = useChat();

  useEffect(() => {
    if (!selectedChat) return;

    loadMessages();
  }, [selectedChat]);

  async function loadMessages() {
    try {
      const data = await getMessages(selectedChat._id);

      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    messages,

    loadMessages,
  };
}

export default useMessages;