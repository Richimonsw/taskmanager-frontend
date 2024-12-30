"use client";

import React from "react";
import Card from "./Card";

function List({ tasks, onEdit, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No hay tareas disponibles</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default List;
