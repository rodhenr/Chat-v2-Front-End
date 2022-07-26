import "./App.css";
import styles from "./styles/App.module.scss";
import Register from "./pages/Register";

function App() {
  return (
    <div className={styles.container}>
      <Register />
    </div>
  );
}

export default App;
