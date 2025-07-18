
import { postAction } from "../actions/postAction";
import "./input.css";
import React from "react";

export async function Input() {
  // テキストがあれば送信許可、なければ許可しない

  return (
    <form className="addTodo js_addTodo_form" action={postAction}>
      <input name="task" type="text" className="addTodo__input js_addTodo_input" placeholder="タスクを入力して追加" />
      <label htmlFor="inputDate" className="addTodo__dateText">
        期限日
      </label>
      <input
        name="deadline"
        type="date"
        id="inputDate"
        className="addTodo__inputDate js_addTodo_inputDate"
        placeholder="タスクを入力して追加"
      />
      <input type="submit" className="addTodo__submit js_addTodo_submit" value="追加" />
    </form>
  );
}

export default Input;
