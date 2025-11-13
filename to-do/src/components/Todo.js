import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function Todo({ task, toggleComplete, deleteTodo, editTodo }) {
  return (
    <div className={`Todo ${task.completed ? "completed" : "incompleted"}`}>
      <p onClick={() => toggleComplete(task.id)}>
        {task.task}
      </p>

      <div>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="edit-icon"
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="delete-icon"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
}
