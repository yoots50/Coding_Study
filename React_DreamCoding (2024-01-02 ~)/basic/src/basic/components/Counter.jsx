import React, { useState } from "react";

export default function Counter({ total, onClick }) {
  const [count, setCount] = useState(0);
  return (
    <div className="counter">
      <span className="number">{count}</span>
      <button
        className="button"
        onClick={() => {
          setCount((prev) => prev + 1);
          onClick();
        }}
      >
        Add
      </button>
    </div>
  );
}
