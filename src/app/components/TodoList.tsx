"use client";

import { useRouter } from "next/navigation";
import { Task } from "../types";
import { ChangeEvent, useState, useEffect } from "react";
import "./todo-list.css";

type Tasks = {
  tasks: Task[];
};

function TodoList({ tasks: initialTasks }: Tasks) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const handleDelete = async (id: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    await fetch(`${API_URL}/api/todo/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };

  const handleChange = async (id: string, updateData: Partial<Task>) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    await fetch(`${API_URL}/api/todo/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...updateData }),
    });
    router.refresh();
  };

  const handleInputChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, [name]: newValue } : task)));

    let updateData: Partial<Task> = {};
    if (name === "completed") {
      updateData = { completed: checked };
    } else if (name === "taskName") {
      updateData = { taskName: value };
    } else if (name === "deadline") {
      updateData = { deadline:(value ? new Date(value) : null) };
    }
    handleChange(id, updateData);
  };

  return (
    <ul className="todoTask__list js_todoTask_list">
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
            <button onClick={() => handleDelete(task.id)} className="todoTask__delete js_todoTask_delete"></button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
