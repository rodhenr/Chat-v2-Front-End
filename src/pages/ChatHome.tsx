import { useEffect, useState } from "react";

import socket from "../socket";

import { useDispatch, useSelector } from "react-redux";
import { changeWidth, newMessage } from "../features/chat/chatSlice";
import {
  addConnection,
  removeConnection,
} from "../features/chat/messagesSlice";
import { RootState } from "../app/store";

import HomeHeader from "../components/Chat/HomeHeader";
import HomeMessages from "../components/Chat/HomeMessages";
import Search from "../components/Chat/Search";
import ChatMessages from "../components/Chat/ChatMessages";
import Logo from "../components/Chat/Logo";
import SendMessage from "../components/Chat/SendMessage";

import { useMainChatInfoQuery } from "../features/chat/chatApiSlice";

import styles from "../styles/Chat/ChatHome.module.scss";
import ChatHeader from "../components/Chat/ChatHeader";

function ChatHome() {
  const dispatch = useDispatch();
  useMainChatInfoQuery();

  const isChatting = useSelector((state: RootState) => state.chat.isChatting);
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Conexão do WebSocket
  useEffect(() => {
    socket.auth = { id: userId };
    socket.connect();
  }, []);

  // Eventos do WebSocket
  useEffect(() => {
    socket.on("private message", (data) => {
      dispatch(newMessage(data));
    });

    socket.on("user_online", (data) => {
      dispatch(addConnection(data));
    });

    socket.on("user_offline", (data) => {
      dispatch(removeConnection(data));
    });
  }, [socket]);

  // Width da janela
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

  useEffect(() => {
    dispatch(changeWidth(windowSize));
  }, [windowSize]);

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
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.header}>
        <HomeHeader />
      </div>
      <div className={styles.search}>
        <Search />
      </div>
      {isChatting === true ? (
        <>
          <div className={styles.info}>
            <ChatHeader />
          </div>
          <div className={styles.messages}>
            <HomeMessages />
          </div>
          <div className={styles.chat}>
            <ChatMessages />
          </div>
          <div className={styles.send}>
            <SendMessage />
          </div>
        </>
      ) : (
        <>
          <div className={styles.info}></div>
          <div className={styles.messages}>
            <HomeMessages />
          </div>
          <div className={`${styles.chat} ${styles.chatNoMessage}`}>
            <p>Selecione um contato para começar uma conversa</p>
          </div>
          <div className={styles.send}></div>
        </>
      )}
    </div>
  );

  return windowSize < 900 ? mobile : desktop;
}

export default ChatHome;
