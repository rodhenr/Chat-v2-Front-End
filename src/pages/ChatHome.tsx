import { useEffect, useState } from "react";

import HomeHeader from "../components/Chat/HomeHeader";
import Messages from "../components/Chat/Messages";
import MessagesMobile from "../components/Chat/MessagesMobile";
import Search from "../components/Chat/Search";
import ChatMessages from "../components/Chat/ChatMessages";
import Logo from "../components/Chat/Logo";
import SendMessage from "../components/Chat/SendMessage";

import { useMainChatInfoQuery } from "../features/chat/chatApiSlice";

import styles from "../styles/Chat/ChatMain.module.scss";

function ChatHome() {
  const { isSuccess } = useMainChatInfoQuery();

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
        <HomeHeader />
      </div>
      <Search />
      <MessagesMobile />
      <Logo />
    </div>
  );

  const desktop = (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <Logo />
      </div>
      <div className={styles.main}>
        <HomeHeader />
        <div className={styles.searchAndChat}>
          <Search />
          <div className={styles.chat}>
            <div className={styles.messagesInfo}>
              <Messages />
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

  return isSuccess && windowSize < 900 ? mobile : desktop;
}

export default ChatHome;
