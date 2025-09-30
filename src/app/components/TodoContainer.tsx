"use client";
import Sort from "./Sort";
import TodoList from "./TodoList";
import { Task } from "../types";
import { useState, useEffect } from "react";
import "./todo-list.css";

type Tasks = {
  initialTasks: Task[];
};

export function TodoContainer({ initialTasks }: Tasks) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("addedDate");
  const [toggleActive, setToggleActive] = useState<boolean>(true);

  const handleToggleActive = () => setToggleActive((toggleActive) => !toggleActive);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case "complete":
        return task.completed;
      case "incomplete":
        return !task.completed;
      case "all":
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sort) {
      case "addedDate_reverse":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "dueDate": //期限が近いものを配列の最後にソート
        //dateが空欄の場合前にソート
        if (!a.deadline) return -1;
        if (!b.deadline) return 1;
        //降順にソート
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      case "dueDate_reverse": //期限が遠いものを配列の先頭にソート
        //dateが空欄の場合後にソート
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        // 昇順にソート
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case "addedDate":
      default:
        // 昇順にソート
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  return (
    <div className="todoTask">
      <Sort
        filter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
        taskCount={filteredTasks.length}
        toggleActive={toggleActive}
        onToggleActive={handleToggleActive}
      />
      <TodoList tasks={sortedTasks} toggleActive={toggleActive} />
    </div>
  );
}

export default TodoContainer;
