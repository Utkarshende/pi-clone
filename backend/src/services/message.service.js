import api from "./axios";

export const getMessages = async (chatId) => {
  const res = await api.get(`/message/${chatId}`);

  return res.data.data;
};

export const sendMessage = async (chatId, content) => {
  const res = await api.post(`/message/${chatId}`, {
    content,
  });

  return res.data.data;
};