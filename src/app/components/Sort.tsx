import React from "react";
import "./sort.css";

function Sort() {
  return (
    <div className="todoTask__header">
      <button className="todoTask__toggle js_todoTask_toggle"></button>
      <p className="todoTask__title">Todoリスト</p>
      <span className="todoTask__count js_todoTask_count">0</span>
      <div className="todoTask__selectWrapper">
        <span className="todoTask__selectText">絞り込み</span>
        <select className="todoTask__select js_todoTask_filter" name="" id="">
          <option value="all">すべて</option>
          <option value="complete">完了</option>
          <option value="incomplete">未完了</option>
        </select>
        <span className="todoTask__selectText">並び替え</span>
        <select className="todoTask__select js_todoTask_sort" name="" id="">
          <option value="addedDate">追加日</option>
          <option value="addedDate_reverse">追加日(逆)</option>
          <option value="dueDate">期限日</option>
          <option value="dueDate_reverse">期限日(逆)</option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
