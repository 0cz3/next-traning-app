"use client";

import { Task } from "../types";
import { ChangeEvent } from "react";
import "./todo-list.css";

type Tasks = {
  tasks: Task[];
  toggleActive: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updateData: Partial<Task>) => void;
};

function TodoList({ tasks, toggleActive, onDelete, onUpdate }: Tasks) {

  const handleInputChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const finalValue = name === 'deadline' ? (value ? new Date(value) : null) : newValue;

    onUpdate(id, { [name]: finalValue });
  };

  if (!toggleActive) {
    return null;
  }


  return (
    <ul className={`todoTask__list js_todoTask_list ${!toggleActive ? "is-closed" : ""}`}>
      {tasks.map((task) => {
        const deadlineDate = task.deadline ? new Date(task.deadline).toISOString().split("T")[0] : "";
        return (
          <li className="todoTask__item js_todoTask_item" key={task.id}>
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              className="todoTask__check js_todoTask__check"
              onChange={(e) => handleInputChange(task.id, e)}
            />
            <input
              name="taskName"
              className="todoTask__label js_todoTask__label"
              value={task.taskName}
              onChange={(e) => handleInputChange(task.id, e)}
            />
            <input
              name="deadline"
              className="todoTask__dateLabel js_todoTask__dateLabel"
              type="date"
              value={deadlineDate}
              onChange={(e) => handleInputChange(task.id, e)}
            />
            <button onClick={() => onDelete(task.id)} className="todoTask__delete js_todoTask_delete"></button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
