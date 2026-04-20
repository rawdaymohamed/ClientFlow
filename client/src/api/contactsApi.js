import api from "./axios";

export const createContact = async (contactData) => {
  const response = await api.post("/contacts", contactData);
  return response.data;
};
export const getContacts = async ({ page = 1, limit = 10 }) => {
  const response = await api.get("/contacts", {
    params: { page, limit },
  });
  return response.data;
};
export const getContactById = async (id) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};
export const updateContact = async (id, contactData) => {
  const response = await api.put(`/contacts/${id}`, contactData);
  return response.data;
};
