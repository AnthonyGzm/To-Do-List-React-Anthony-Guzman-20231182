import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("todas");

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error leyendo localStorage:", error);
    }
  }, []);

  // Guardar en localStorage en cada cambio
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    if (!task.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      task,
      completed: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isEditing: !t.isEditing } : t
      )
    );
  };

  const editTask = (newTask, id) => {
    setTodos(
      todos.map((t) =>
        t.id === id
          ? { ...t, task: newTask, isEditing: false }
          : t
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.completed));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "pendientes") return !t.completed;
    if (filter === "completadas") return t.completed;
    return true;
  });

  const pendientes = todos.filter((t) => !t.completed).length;

  return (
    <div className="TodoWrapper">
      <h1>To-Do List App</h1>
      <h1>Anthony Guzman</h1>

      <TodoForm addTodo={addTodo} />

      {/* FILTROS */}
      <div style={{ marginBottom: "1rem" }}>
        <button className="todo-btn" onClick={() => setFilter("todas")}>
          Todas
        </button>
        <button className="todo-btn" onClick={() => setFilter("pendientes")}>
          Pendientes
        </button>
        <button className="todo-btn" onClick={() => setFilter("completadas")}>
          Completadas
        </button>
      </div>

      {/* CONTADOR */}
      <p style={{ color: "#fff", marginBottom: "1rem" }}>
        Tareas pendientes: <b>{pendientes}</b>
      </p>

      {/* LISTA */}
      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={toggleEdit}
          />
        )
      )}

      <button className="todo-btn" onClick={clearCompleted}>
        Limpiar completadas
      </button>
    </div>
  );
};
