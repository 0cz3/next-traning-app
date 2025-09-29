import React from "react";
import "./sort.css";

type SortProps = {
  filter: string;
  onFilterChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  taskCount: number;
};

function Sort({filter, onFilterChange, sort, onSortChange, taskCount}: SortProps) {
  return (
    <div className="todoTask__header">
      <button className="todoTask__toggle js_todoTask_toggle"></button>
      <p className="todoTask__title">Todoリスト</p>
      <span className="todoTask__count js_todoTask_count">{taskCount}</span>
      <div className="todoTask__selectWrapper">
        <span className="todoTask__selectText">絞り込み</span>
        <select className="todoTask__select js_todoTask_filter" value={filter} onChange={(e) => onFilterChange(e.target.value)} name="" id="">
          <option value="all">すべて</option>
          <option value="complete">完了</option>
          <option value="incomplete">未完了</option>
        </select>
        <span className="todoTask__selectText">並び替え</span>
        <select className="todoTask__select js_todoTask_sort" value={sort} onChange={(e) => onSortChange(e.target.value)}  name="" id="">
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
