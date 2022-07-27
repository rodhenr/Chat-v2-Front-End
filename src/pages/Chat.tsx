import ChatHeader from "../components/ChatHeader";
import ChatMessage from "../components/ChatMessage";
import ChatSearch from "../components/ChatSearch";
import styles from "../styles/Chat.module.scss";

function Chat() {
  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatSearch />
      <ChatMessage />
    </div>
  );
}

export default Chat;
