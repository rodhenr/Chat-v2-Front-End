import UserInfo from "./HomeHeader";
import SendMessage from "./SendMessage";
import ChatMessages from "./ChatMessages";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/ChatPage.module.scss";

function ChatPage() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <UserInfo />
      </div>
      <ChatMessages />
      <SendMessage />
    </div>
  );
}

export default ChatPage;
