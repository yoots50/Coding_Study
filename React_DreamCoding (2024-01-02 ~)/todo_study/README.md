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