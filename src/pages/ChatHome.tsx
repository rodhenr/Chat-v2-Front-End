import { useEffect, useState } from "react";

import HomeHeader from "../components/Chat/HomeHeader";
import HomeMessages from "../components/Chat/HomeMessages";
import Search from "../components/Chat/Search";
import ChatMessages from "../components/Chat/ChatMessages";
import Logo from "../components/Chat/Logo";
import SendMessage from "../components/Chat/SendMessage";

import { useMainChatInfoQuery } from "../features/chat/chatApiSlice";

import styles from "../styles/Chat/ChatHome.module.scss";

function ChatHome() {
  useMainChatInfoQuery();

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
      <HomeHeader />
      <Search />
      <HomeMessages />
      <Logo />
    </div>
  );

  const desktop = (
    <div className={styles.container}>
      <div className={styles.leftColumn}>
        <Logo />
      </div>
      <div className={styles.header}>
        <HomeHeader />
      </div>
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.info}></div>

      <div className={styles.messages}>
        <HomeMessages />
      </div>
      <div className={styles.chat}>
        <ChatMessages />
      </div>
      <div className={styles.send}>
        <SendMessage />
      </div>
    </div>
  );

  return windowSize < 900 ? mobile : desktop;
}

export default ChatHome;
