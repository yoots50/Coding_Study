import { isValidElement, useEffect, useState } from "react";
import styles from "./TodoContainer.module.css";
import TodoList from "./TodoList";
export default function TodoContainer() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todo"));
    if (localTodos === null) {
      setTodos([]);
    } else {
      setTodos(localTodos);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTodo();
    }
    console.log(todos);
  }, [todos]);

  const saveTodo = () => {
    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => [...prev, { todo: value, isDone: false }]);
    console.log(todos);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.todocontainer}>
      <header></header>
      <main>
        {todos &&
          todos.map((todo, index) => {
            return (
              <TodoList
                key={index}
                index={index}
                todo={todo.todo}
                isDone={todo.isDone}
                setTodos={setTodos}
              />
            );
          })}
      </main>
      <footer>
        <form onSubmit={handleSubmit} className={styles.todoform}>
          <div className={styles.todoformcontainer}>
            <input
              type="text"
              id="todo"
              name="todo"
              placeholder="Todo 생성하기..."
              onChange={handleChange}
              value={value}
              className={styles.todoinput}
            ></input>
            <button className={styles.todobutton}>만들기</button>
          </div>
        </form>
      </footer>
    </div>
  );
}
