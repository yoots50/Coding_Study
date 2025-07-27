import { isValidElement, useEffect, useState } from "react";
import styles from "./TodoContainer.module.css";
import TodoList from "./TodoList";
import TodoHeaderButton from "./TodoHeaderButton";
export default function TodoContainer({
  isDark: isDark,
  setIsDark: setIsDark,
}) {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [todoMode, setTodoMode] = useState("All");

  const TODOS_KEY = "todos";
  const DARK_KEY = "Dark";

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
    const localIsDark = localStorage.getItem(DARK_KEY);
    if (localTodos === null) {
      setTodos([]);
    } else {
      setTodos(localTodos);
    }
    setIsLoaded(true);

    setIsDark(localIsDark);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveLocal(TODOS_KEY, todos);
    }
  }, [todos]);

  const saveLocal = (KEY, data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      setTodos((prev) => [...prev, { todo: value, isDone: false }]);
    }
    else {
      alert("내용을 입력해주세요.")
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleDarkMode = (e) => {
    setIsDark((prev) => !prev);
  };
  const handleAllbutton = (e) => {
    setTodoMode("All");
  };
  const handleActivebutton = (e) => {
    setTodoMode("Active");
  };
  const handleCompletedbutton = (e) => {
    setTodoMode("Completed");
  };

  const test = 50
  return (
    <div
      className={styles.todocontainer}
      style={{
        backgroundColor: isDark ? "#5a8f8c" : "#d8b4f8",
      }}
    >
      <header
        className={styles.header}
        style={{
          backgroundColor: isDark ? "#22363b" : "#ffe298",
        }}
      >
        <TodoHeaderButton
          isDark={isDark}
          handler={handleAllbutton}
          text={"All"}
          type={"btn"}
        />
        <TodoHeaderButton
          isDark={isDark}
          handler={handleActivebutton}
          text={"Active"}
          type={"btn"}
        />
        <TodoHeaderButton
          isDark={isDark}
          handler={handleCompletedbutton}
          text={"Completed"}
          type={"btn"}
        />
        <TodoHeaderButton
          isDark={isDark}
          handler={handleDarkMode}
          text={isDark ? "🌞" : "🌙"}
          type={"dark"}
        />
      </header>
      <main
        className={`${styles.todos} ${styles.scroll}`}
        style={{
          backgroundColor: isDark ? "#154544" : "#ffb677",
        }}
      >
        {todos &&
          todos.map((todo, index) => {
            if (todoMode === "All") {
              return (
                <TodoList
                  key={index}
                  index={index}
                  todo={todo}
                  setTodos={setTodos}
                  isDark={isDark}
                />
              );
            } else if (todoMode === "Completed") {
              if (todo.isDone) {
                return (
                  <TodoList
                    key={index}
                    index={index}
                    todo={todo}
                    setTodos={setTodos}
                    isDark={isDark}
                  />
                );
              }
            } else if (todoMode === "Active") {
              if (!todo.isDone) {
                return (
                  <TodoList
                    key={index}
                    index={index}
                    todo={todo}
                    setTodos={setTodos}
                    isDark={isDark}
                  />
                );
              }
            } else {
              console.log(`Unknown todoMode: ${todoMode}`);
            }
          })}
      </main>
      <footer
        className={styles.footer}
        style={{
          backgroundColor: isDark ? "#3c627b" : "#6ed49e",
        }}
      >
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
