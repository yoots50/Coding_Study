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
