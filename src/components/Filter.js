"use client";

import React from "react";

function Filter({ filter, applyFilter }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button
        onClick={() => applyFilter("all")}
        className={`px-4 py-2 rounded ${
          filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        Todas
      </button>
      <button
        onClick={() => applyFilter("completed")}
        className={`px-4 py-2 rounded ${
          filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        Completadas
      </button>
      <button
        onClick={() => applyFilter("pending")}
        className={`px-4 py-2 rounded ${
          filter === "pending" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        Pendientes
      </button>
    </div>
  );
}

export default Filter;
