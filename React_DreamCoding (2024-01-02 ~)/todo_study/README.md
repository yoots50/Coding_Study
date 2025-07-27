# 강의 보고 Todo 리스트 만들어보기

## 직접 해본것

- 리스트를 만들고 체크박스를 넣음으로써 todo 리스트의 기본적인 틀을 만듬

```js
// TodoList.jsx
export default function TodoList() {
  return (
    <div>
      <ul>
        <li>
          장보기 <input type="checkbox"></input>
        </li>
        <li>
          공부하기<input type="checkbox"></input>
        </li>
      </ul>
    </div>
  );
}
```

- 리스트를 직접 추가할 수 있는 입력창을 만들고 문자열의 양끝의 공백을 모두 지워 저장, 만약 입력받은 문자열이 공백밖에 없을 경우 추가 버튼을 눌러도 추가되지 않게 함
``` JS
// TodoList.jsx
import React, { useState } from "react";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);
  const [value, setValue] = useState('')
  const onChange = (event) => {
      setValue(event.target.value)
  }
  const onClick = () => {
      const trimmedValue = value.trim()
      if (trimmedValue !== "") {
        setTodos((prev) => [...prev, {id:Math.random(), text:trimmedValue, status:"active"}])
      }
  }
  return (
    <section>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      <input value={value} onChange={onChange} placeholder="Add Todo"></input>
      <button onClick={onClick}>Add</button>
    </section>
  );
}
```

- 리스트의 삭제 버튼과 체크 버튼을 만듬
```js
// Todos.jsx
import React from "react";
export default function Todos({ handleDelete, handleStatus,item }) {
  const handleClick = () => {
    handleDelete(item.id)
  }
  const handleCheck = () => {
    handleStatus(item.id)
  }
  return (
      <li key={item.id}>
        <input type="checkbox" onChange={handleCheck} key={item.id} checked={item.status === "active" ? false : true}></input>
        {item.text}
        <button onClick={handleClick}>del</button>
      </li>
  );
}

// TodoList.jsx
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
```
- 필터 버튼을 추가해 status에 따라 보여주는 todo를 다르게 하기
```js
import React, { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: "123", text: "장보기", status: "active" },
    { id: "124", text: "공부하기", status: "active" },
  ]);
  const [filter, setFilter] = useState("all");
  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };
  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };
  const handleFilter = (e) => {
    setFilter(e.target.innerHTML);
    console.log(filter);
  };
  return (
    <section>
      <button onClick={handleFilter}>all</button>
      <button onClick={handleFilter}>active</button>
      <button onClick={handleFilter}>completed</button>
      <ul>
        {todos
          .filter((item) => item.status === filter)
          .map((item) => (
            <Todo
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}
```

- 다크모드 만들기 (module.css를 다크모드와 라이트모드 버전 두가지로 나누어 색이 달라지게 함)
```js
// App.js
import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";

const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [isDarkMode, setDarkMode] = useState(false); // 다크모드 변수
  return (
    <>
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={setFilter}
        isDarkMode={isDarkMode} // 다크모드 변수를 넘겨줌
        onDarkModeChange={setDarkMode} // 다크모드를 바꾸게 하도록 함
      />
      <TodoList filter={filter} isDarkMode={isDarkMode}/> {/* 다크모드를 다른 컴포넌트들에게 뿌림 */} 
    </>
  );
}
export default App;
```

- localStorage에 todos 저장하기
```js
import React, { useEffect, useRef, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css";
export default function TodoList({ filter, isDarkMode }) {
  const [todos, setTodos] = useState([]);
  const didMount = useRef(false); // 2번째 useEffect가 마운트될 때 실행되는 것을 막기위함
  useEffect(() => { // localStorage에서 todos 불러오기
    const todos = localStorage.getItem("todos");
    setTodos(JSON.parse(todos));
  }, []);

  useEffect(() => { // todos가 바뀔 때마다  todos 저장
    if (didMount.current) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      didMount.current = true;
    }
  }, [todos]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleUpdate = (updated) => {
    setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
  };
  const handleDelete = (deleted) => {
    setTodos(todos.filter((t) => t.id !== deleted.id));
  };
  const filtered = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {console.log(todos)}
        {filtered && // filtered에 아무것도 없으면 실행 x
          filtered.map((item) => (
            <Todo
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isDarkMode={isDarkMode}
            />
          ))}
      </ul>
      <AddTodo onAdd={handleAdd} isDarkMode={isDarkMode} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === "all") {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}
```