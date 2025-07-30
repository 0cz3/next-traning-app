import React from "react";
import { Task } from "../types";

type Tasks = {
  tasks: Task[];
};

function TodoList({ tasks }: Tasks) {
  return (
    <ul className="todoTask__list js_todoTask_list">
      {tasks.map((task) => {
        const deadlineDate = task.deadline && new Date(task.deadline).toISOString().split("T")[0];
        return (
          <li className="todoTask__item js_todoTask_item" key={task.id}>
            <button className="todoTask__check js_todoTask_check ${this.#todoTask.completed ? 'checked' : ''}"></button>
            <input className="todoTask__label js_todoTask_label" value={task.taskName} />
            <input className="todoTask__dateLabel js_todoTask_dateLabel" type="date" value={deadlineDate} />
            <button className="todoTask__delete js_todoTask_delete"></button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
