import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todos from "../Todos/Todos";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);
  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };
  const handleStatus = (id) => {
    setTodos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "active" ? "passive" : "active",
          };
        }
        return item;
      })
    );
  };
  return (
    <section>
      <ul>
        {todos.map((item) => (
          <Todos
            handleDelete={handleDelete}
            handleStatus={handleStatus}
            item={item}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
