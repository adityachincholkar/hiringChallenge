// frontend/src/services/api.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

export const register = (userData) => api.post("/users/register", userData);
export const login = (credentials) => api.post("/users/login", credentials);
export const getProperties = () => api.get("/properties");
export const getProperty = (id) => api.get(`/properties/${id}`);
export const createProperty = (propertyData, token) =>
  api.post("/properties", propertyData, { headers: { Authorization: token } });
export const updateProperty = (id, propertyData, token) =>
  api.put(`/properties/${id}`, propertyData, {
    headers: { Authorization: token },
  });
export const deleteProperty = (id, token) =>
  api.delete(`/properties/${id}`, { headers: { Authorization: token } });
