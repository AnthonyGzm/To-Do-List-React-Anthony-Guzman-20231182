import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

export default function TodoWrapper() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("todas");

  // Cargar desde localStorage UNA vez
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(saved);
  }, []);

  // Guardar cada vez que cambien
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    if (!task.trim()) return;

    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        task,
        completed: false,
        isEditing: false,
      },
    ]);
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

  const editTask = (id, newTask) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, task: newTask, isEditing: false } : t
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

      <p style={{ color: "#fff", marginBottom: "1rem" }}>
        Tareas pendientes: <strong>{pendientes}</strong>
      </p>

      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo.id}
            task={todo}
            editTask={editTask}
          />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            toggleEdit={toggleEdit}
          />
        )
      )}

      <button className="todo-btn" onClick={clearCompleted}>
        Limpiar completadas
      </button>
    </div>
  );
}
