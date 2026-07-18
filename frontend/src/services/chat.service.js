import api from "./axios";

export const getChats = async () => {
  const { data } = await api.get("/chats");

  return data.data;
};

export const createChat = async () => {
  const { data } = await api.post("/chats");

  return data.data;
};

export const renameChat = async (chatId, title) => {
  const { data } = await api.put(`/chats/${chatId}`, {
    title,
  });

  return data.data;
};

export const deleteChat = async (chatId) => {
  const { data } = await api.delete(`/chats/${chatId}`);

  return data.data;
};