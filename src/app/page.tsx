import Input from "./components/Input";
import TodoContainer from "./components/TodoContainer";
import "./globals.css";

export default async function Home() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  // cache: "no-store" = SSR 動的データ取得 更新頻度高
  const res = await fetch(`${API_URL}/api/todo`, { cache: "no-store" }).catch((err)=>{
    console.log(err)
    console.log(API_URL)
  })
  let tasks
  if(!res){
    tasks = ""
  } else {
    tasks = await res.json();
  }
  console.log(`tasks${tasks}`)
  return (
    <div className="todo">
      <Input />
      <div className="todoTask">
        <TodoContainer initialTasks={tasks.tasks}/>
      </div>
    </div>
  );
}
