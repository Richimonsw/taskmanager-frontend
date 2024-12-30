"use client";

import PublicRoute from "@/context/PublicRoute";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <PublicRoute>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <header className="bg-blue-600 text-white py-8 w-full rounded-lg shadow-md">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg">
              Simplifica tu vida organizando tus tareas con facilidad.
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">¡Comienza ahora!</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition-all shadow-lg"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => router.push("/register")}
                className="px-6 py-3 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition-all shadow-lg"
              >
                Registrarse
              </button>
            </div>
          </div>
        </header>
        <footer className="mt-8 text-sm text-gray-500">
          <p>Elaborado por Ricardo Montufar</p>
        </footer>
      </div>
    </PublicRoute>
  );
}
