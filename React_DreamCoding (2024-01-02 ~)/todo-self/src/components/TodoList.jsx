import { useEffect, useState } from "react";
import styles from "./TodoList.module.css";

export default function TodoList({
  todo: todo,
  index: index,
  setTodos: setTodos,
  isDark: isDark,
}) {
  const [checked, setChecked] = useState(todo.isDone);

  useEffect(() => {
    setTodos((prev) =>
      prev.map((todo, i) => {
        if (i === index) {
          return { ...todo, isDone: checked };
        }
        return todo;
      })
    );
  }, [checked]);

  const handleClick = () => {
    setTodos((prev) => prev.filter((todo, i) => i !== index));
  };
  const handleChange = (e) => {
    setChecked((prev) => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: isDark ? "#646464" : "#ffffff",
      }}
      className={styles.container}
    >
      <input onChange={handleChange} type="checkbox" checked={checked}></input>
      <span
        style={{
          textDecoration: checked ? "line-through" : "none",
          color: checked ? "gray" : "black",
        }}
      >
        {todo.todo}
      </span>
      <button onClick={handleClick} className={styles.todobutton}>
        🗑
      </button>
    </div>
  );
}
