import axios from "axios";
import { Todo, TodoStats } from "../types";

const API_URL = process.env.REACT_APP_API_URL || "http://todoback:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: () => {
    window.location.href = `${API_URL}/auth/google`;
  },
  handleCallback: async (code: string) => {
    const response = await axios.get(
      `${API_URL}/auth/google/callback?code=${code}`
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  },
};

export const todos = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get("/api/todos");
    return response.data;
  },

  create: async (data: {
    title: string;
    description?: string;
  }): Promise<Todo> => {
    const response = await api.post("/api/todos", data);
    return response.data;
  },

  update: async (id: string, data: Partial<Todo>): Promise<Todo> => {
    const response = await api.patch(`/api/todos/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/todos/${id}`);
  },

  getStats: async (): Promise<TodoStats> => {
    const response = await api.get("/api/todos/stats");
    return response.data;
  },
};

export const googleAuth = async () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const googleAuthCallback = async (code: string) => {
  const response = await axios.get(
    `${API_URL}/auth/google/callback?code=${code}`
  );
  return response.data;
};
