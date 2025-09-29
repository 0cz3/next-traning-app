import Input from "./components/Input";
import TodoContainer from "./components/TodoContainer";
import "./globals.css";

export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  // cache: "no-store" = SSR 動的データ取得 更新頻度高
  let tasks = { tasks: [] };
  try {
    const res = await fetch(`${API_URL}/api/todo`, { cache: "no-store" });
    if (res.ok) {
      tasks = await res.json();
    } else {
      console.error("tasksを取得できません", res.status);
    }
  } catch (err) {
    console.error(err);
    console.log("API URL", API_URL);
  }
  return (
    <div className="todo">
      <Input />
      <div className="todoTask">
        <TodoContainer initialTasks={tasks.tasks} />
      </div>
    </div>
  );
}
