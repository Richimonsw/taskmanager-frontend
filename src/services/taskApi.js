const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

import { isTokenExpired } from "@/utils/auth";
import { toast } from "react-toastify";

const getAuthHeaders = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token || isTokenExpired(token)) {
    toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    localStorage.removeItem("token");
    window.location.href = "/login";
    return {};
  }

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error al procesar la solicitud");
  }
  return await response.json();
};

export const getTasks = async () => {
  const response = await fetch(`${API_BASE}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(response);
};

export const getTaskById = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(response);
};

export const createTask = async (task) => {
  const response = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(task),
  });
  return handleResponse(response);
};

export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(updatedTask),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  });
  return handleResponse(response);
};

export const toggleTask = async (id, completed) => {
  const response = await fetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ completed }),
  });
  return handleResponse(response);
};
