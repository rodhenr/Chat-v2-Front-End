import styles from "../styles/Chat.module.scss";

function ChatSearch() {
  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Procure por um usuário" />
      <button>X</button>
    </div>
  );
}

export default ChatSearch;
