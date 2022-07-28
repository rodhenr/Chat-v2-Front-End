import UserInfo from "../components/Chat/UserInfo";
import Message from "../components/Chat/Messages";
import Search from "../components/Chat/Search";
import Logout from "../components/Chat/Logout";
import ChatMessages from "../components/Chat/ChatMessages";
import Logo from "../components/Chat/Logo";
import SendMessage from "../components/Chat/SendMessage";

import styles from "../styles/Chat/ChatMain.module.scss";
import { useEffect, useState } from "react";

function Chat() {
  function getWindowSize() {
    const width = window.innerWidth;
    return width;
  }

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return windowSize < 900 ? (
    <div className={styles.container}>
      <div className={styles.info}>
        <UserInfo />
        <Logout />
      </div>
      <Search />
      <Message />
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <Logo />
      </div>
      <div className={styles.main}>
        <div className={styles.userInfo}>
          <UserInfo />
          <Logout />
        </div>
        <div className={styles.searchAndChat}>
          <Search />
          <div className={styles.chat}>
            <div className={styles.messagesInfo}>
              <Message />
            </div>
            <div className={styles.chatMessage}>
              <ChatMessages />
              <SendMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

/*

*/
