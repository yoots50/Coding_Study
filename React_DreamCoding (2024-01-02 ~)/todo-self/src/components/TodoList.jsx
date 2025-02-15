import { useState } from "react";
import styles from "./TodoList.module.css";

export default function TodoList({
  todo: todo,
  index: index,
  isDone: isDone,
  setTodos: setTodos,
}) {
  const [checked, setChecked] = useState(isDone);
  const handleClick = () => {
    setTodos((prev) => prev.filter((todo, i) => i !== index));
  };
  const handleChange = (e) => {
    setChecked((prev) => !prev);
    setTodos((prev) => prev.map((todo, i) => {
        if (i === index) {
            return {...todo, isDone: !checked}
        }
        return todo
    }))
  };

  return (
    <div>
      <input onChange={handleChange} type="checkbox" checked={checked}></input>
      <span style={{
        textDecoration: checked ? "line-through" : "none",
        color: checked ? "gray" : "black",
      }}>
        {todo} {isDone}
      </span>
      <button onClick={handleClick} className={styles.todobutton}>
        🗑
      </button>
    </div>
  );
}
