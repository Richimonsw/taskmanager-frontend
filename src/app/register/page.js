"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import PublicRoute from "@/context/PublicRoute";

const Register = () => {
  const { register, error } = useContext(AuthContext);
  const [details, setDetails] = useState({ username: "", password: "" });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(details);
  };

  return (
    <PublicRoute>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
            Crear Cuenta
          </h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={details.username}
              onChange={(e) =>
                setDetails({ ...details, username: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-all"
            >
              Registrarse
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-green-500 font-semibold hover:underline"
              >
                Inicia Sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default Register;
