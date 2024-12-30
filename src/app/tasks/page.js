"use client";

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createTask,
  deleteTask,
  updateTask,
  toggleTask,
} from "@/services/taskApi";
import { useRouter } from "next/navigation";
import TaskContext from "@/context/TaskContext";
import AuthContext from "@/context/AuthContext";
import withAuth from "@/context/withAuth";
import List from "@/components/List";
import Actions from "@/components/Actions";
import Form from "@/components/Form";
import LoaderOverlay from "@/components/LoaderOverlay";
import Filter from "@/components/Filter";

function Tasks() {
  const { fetchTasks, loading, filter, applyFilter, filteredTasks } =
    useContext(TaskContext);
  const { logout } = useContext(AuthContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const router = useRouter();

  const handleCreate = () => {
    setCurrentTask(null);
    setIsFormOpen(true);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Tarea eliminada exitosamente");
      fetchTasks();
    } catch (error) {
      toast.error("Error al eliminar la tarea");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchTasks();
    } else {
      router.push("/login");
    }
  }, [fetchTasks]);

  const handleFormSubmit = async (data) => {
    try {
      if (currentTask) {
        await updateTask(currentTask._id, data);
        toast.success("Tarea actualizada exitosamente");
      } else {
        await createTask(data);
        toast.success("Tarea creada exitosamente");
      }
      setIsFormOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error("Error al guardar la tarea");
    }
  };

  const handleToggleTask = async (id, completed) => {
    try {
      const data = await toggleTask(id, completed);
      console.log(data);

      toast.success(
        data.task.completed
          ? "Tarea marcada como pendiente"
          : "Tarea marcada como completada"
      );
      

      fetchTasks();
    } catch (error) {
      toast.error("Error al cambiar la tarea");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="p-4">
      <Actions onCreate={handleCreate} onLogout={handleLogout} />
      {isFormOpen ? (
        <Form
          onSubmit={handleFormSubmit}
          initialData={currentTask}
          onCancel={() => setIsFormOpen(false)}
        />
      ) : (
        <>
          <Filter filter={filter} applyFilter={applyFilter} />

          <List
            tasks={filteredTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggleTask}
          />
        </>
      )}
    </div>
  );
}

export default withAuth(Tasks);
