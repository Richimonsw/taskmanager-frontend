
"use client";

import React from "react";

function Card({ task, onEdit, onDelete, onToggle }) {
  return (
    <div
      className={`relative border p-4 rounded shadow-md transition-shadow duration-200 overflow-hidden ${
        task.completed
          ? "bg-green-50 border-green-300"
          : "bg-red-50 border-red-300"
      }`}
    >
      <div
        className={`absolute bottom-2 right-2 text-6xl opacity-20 ${
          task.completed ? "text-green-500" : "text-red-500"
        }`}
      >
        {task.completed ? "✔️" : "⚠️"}
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
          <button
            onClick={() => onToggle(task._id, !task.completed)} 
            className={`px-3 py-1 text-sm font-semibold rounded ${
              task.completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {task.completed
              ? "Marcar como Pendiente"
              : "Marcar como Completada"}
          </button>
        </div>
        <p className="text-gray-600 mt-2">{task.description}</p>
        <p className="text-sm text-gray-400 mt-2">
          {`Creado el: ${new Date(task.createdAt).toLocaleDateString()}`}
        </p>
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-all duration-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-all duration-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
