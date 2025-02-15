import TodoContainer from "./components/TodoContainer";
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.container}>
      <TodoContainer/>
    </div>
  );
}

export default App;
