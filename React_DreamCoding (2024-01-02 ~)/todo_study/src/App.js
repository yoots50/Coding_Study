import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";

const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <>
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={setFilter}
      />
      <TodoList filter={filter}/>
    </>
  );
}

export default App;
