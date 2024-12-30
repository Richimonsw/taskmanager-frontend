"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "@/services/authApi";
import { isTokenExpired } from "@/utils/auth";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const PUBLIC_ROUTES = ["/", "/login", "/register"];

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const data = await response;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      toast.success("Inicio de sesión exitoso");
      router.push("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  const register = async (user) => {
    try {
      await registerUser(user);
      toast.success("Usuario creado correctamente");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Cierre de sesión exitoso");
  };

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(pathname)) {
      return;
    }

    const token = localStorage.getItem("token");

    if (token && !isTokenExpired(token)) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); 
        setUser(decoded.user); 
      } catch (err) {
        console.error("Error al decodificar el token:", err);
        logout();
      }
    } else {
      logout();
    }
  }, [pathname]);

  const value = {
    user,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
