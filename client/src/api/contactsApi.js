import api from "./axios";

export const createContact = async (contactData) => {
  const response = await api.post("/contacts", contactData);
  return response.data;
};
