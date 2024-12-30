"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import PublicRoute from "@/context/PublicRoute";

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/tasks");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <PublicRoute>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Bienvenido
          </h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-all"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-blue-500 font-semibold hover:underline"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default Login;
