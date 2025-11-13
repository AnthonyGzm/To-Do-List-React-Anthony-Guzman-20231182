import React, { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        className="todo-input"
        placeholder="Que haras hoy"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Agregar
      </button>
    </form>
  );
}
