import { useEffect, useState } from "react";

import {
  getChats,
  createChat,
} from "../services/chat.service";

function useChats() {
  const [chats, setChats] = useState([]);

  const loadChats = async () => {
    try {
      const data = await getChats();

      setChats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addChat = async () => {
    try {
      const chat = await createChat();

      setChats((prev) => [chat, ...prev]);

      return chat;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  return {
    chats,
    addChat,
    loadChats,
  };
}

export default useChats;