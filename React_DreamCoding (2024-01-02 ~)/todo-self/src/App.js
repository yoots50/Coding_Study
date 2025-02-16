import TodoContainer from "./components/TodoContainer";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isDark ? "#292929" : "#ffffff",
      }}
    >
      <TodoContainer isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
}

export default App;
