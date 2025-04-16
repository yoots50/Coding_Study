import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { DarkModeProvider } from "./components/context/DarkModeContext";

const filters = ["all", "active", "completed"];
function App() {
  const [filter, setFilter] = useState(filters[0]);
  const [isDarkMode, setDarkMode] = useState(false);
  return (
    <DarkModeProvider>
      <Header
        filters={filters}
        filter={filter}
        onFilterChange={setFilter}
        isDarkMode={isDarkMode}
        onDarkModeChange={setDarkMode}
      />
      <TodoList filter={filter} isDarkMode={isDarkMode}/>
    </DarkModeProvider>
  );
}

export default App;
