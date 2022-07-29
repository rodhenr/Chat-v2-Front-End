import { useEffect, useState } from "react";

import UserInfo from "../components/Chat/UserInfo";
import Messages from "../components/Chat/Messages";
import MessagesMobile from "../components/Chat/MessagesMobile";
import Search from "../components/Chat/Search";
import Logout from "../components/Chat/Logout";
import ChatMessages from "../components/Chat/ChatMessages";
import Logo from "../components/Chat/Logo";
import SendMessage from "../components/Chat/SendMessage";

import { useGetInfoUserQuery } from "../features/chat/chatApiSlice";

import styles from "../styles/Chat/ChatMain.module.scss";

function Chat() {
  const { isSuccess } = useGetInfoUserQuery();

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

  const mobile = (
    <div className={styles.container}>
      <div className={styles.info}>
        <UserInfo />
        <Logout />
      </div>
      <Search />
      <MessagesMobile />
    </div>
  );

  const desktop = (
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
              <Messages />
            </div>
            <div className={styles.chatMessage}>
              <ChatMessages id="" />
              <SendMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isSuccess && windowSize < 900 ? mobile : desktop;
}

export default Chat;
