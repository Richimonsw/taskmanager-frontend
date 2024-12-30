"use client";

import React from "react";

function Actions({ onCreate, onLogout }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Lista de Tareas</h1>
      <div className="flex space-x-2">
        <button
          onClick={onCreate}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Crear nueva tarea
        </button>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Actions;
