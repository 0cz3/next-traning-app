"use client";

import { useRouter } from "next/navigation";
import { Task } from "../types";
import "./todo-list.css";

type Tasks = {
  tasks: Task[];
};

function TodoList({ tasks }: Tasks) {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    console.log("a");
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

  return (
    <ul className="todoTask__list js_todoTask_list">
      {tasks.map((task) => {
        const deadlineDate = task.deadline && new Date(task.deadline).toISOString().split("T")[0];
        return (
          <li className="todoTask__item js_todoTask_item" key={task.id}>
            <input type="checkbox" checked={task.completed} className="todoTask__check js_todoTask_check" />
            <input className="todoTask__label js_todoTask_label" value={task.taskName} />
            <input className="todoTask__dateLabel js_todoTask_dateLabel" type="date" value={deadlineDate} />
            <button onClick={() => handleDelete(task.id)} className="todoTask__delete js_todoTask_delete"></button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
