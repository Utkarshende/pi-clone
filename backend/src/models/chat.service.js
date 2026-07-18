import api from "./axios";

export const getChats = async () => {
  const res = await api.get("/chat");

  return res.data.data;
};

export const createChat = async () => {
  const res = await api.post("/chat");

  return res.data.data;
};

export const deleteChat = async (chatId) => {
  const res = await api.delete(`/chat/${chatId}`);

  return res.data.data;
};

export const renameChat = async (chatId, title) => {
  const res = await api.patch(`/chat/${chatId}`, {
    title,
  });

  return res.data.data;
};