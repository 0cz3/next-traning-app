import Input from "./components/Input";
import Sort from "./components/Sort";
import TodoList from "./components/TodoList";
import "./globals.css";

export default function Home() {
  return (
    <div className="todo">
      <Input />
      <div className="todoTask">
        <Sort />
        <TodoList/>
      </div>
    </div>
  );
}
