"use client";
import { useRouter } from "next/navigation";
import "./input.css";
import React, { useState } from "react";

export function Input() {
  // テキストがあれば送信許可、なければ許可しない
  const router = useRouter();
  const [taskName, setTaskName] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;
    await fetch(`${API_URL}/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, deadline }), // req.bodyに入る
    });
    setTaskName("");
    setDeadline("");
    router.refresh();
  };

  return (
    <form className="addTodo js_addTodo_form" onSubmit={handleSubmit}>
      <input
        name="task"
        value={taskName}
        type="text"
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
        className="addTodo__input js_addTodo_input"
        placeholder="タスクを入力して追加"
      />
      <label htmlFor="inputDate" className="addTodo__dateText">
        期限日
      </label>
      <input
        name="deadline"
        value={deadline}
        type="date"
        onChange={(e) => {
          setDeadline(e.target.value);
        }}
        id="inputDate"
        className="addTodo__inputDate js_addTodo_inputDate"
        placeholder="タスクを入力して追加"
      />
      <input type="submit" className="addTodo__submit js_addTodo_submit" value="追加" />
    </form>
  );
}

export default Input;
