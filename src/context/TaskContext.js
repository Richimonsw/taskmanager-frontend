"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { getTasks } from "@/services/taskApi";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasks = await getTasks();
      setTasks(tasks);
      setFilteredTasks(tasks);
    } catch (err) {
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, []);

  const applyFilter = (filter) => {
    setFilter(filter);
    if (filter === "completed") {
      setFilteredTasks(tasks.filter((task) => task.completed));
    } else if (filter === "pending") {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    } else {
      setFilteredTasks(tasks);
    }
  };

  useEffect(() => {
    applyFilter(filter);
  }, [tasks]);

  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        fetchTasks,
        error,
        loading,
        filter,
        applyFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
