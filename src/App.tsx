import "./App.css";
import styles from "./styles/App.module.scss";
import Login from "./pages/Login";

function App() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

export default App;
