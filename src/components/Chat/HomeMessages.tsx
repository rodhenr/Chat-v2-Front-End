import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  addConnection,
  addMessagesHome,
  newMessage,
  removeConnection,
  setChatting,
  usersConnected,
} from "../../features/chat/chatSlice";
import {
  chatApiSlice,
} from "../../features/chat/chatApiSlice";
import { clearToken } from "../../features/auth/authSlice";

import socket from "../../socket";

import avatar from "../../images/avatar.webp";

import styles from "../../styles/Chat/HomeMessages.module.scss";

interface Messages {
  createdAt: string;
  message: string;
  read: boolean;
  receiver: string;
  sender: string;
}

interface DataConnection {
  avatar: string;
  fullName: string;
  message: Messages;
  notRead: number;
  userId: string;
}

function HomeMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const width = useSelector((state: RootState) => state.chat.width);

  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;

  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const cId = useSelector((state: RootState) => state.chat.contactId);
  const messagesHome = useSelector(
    (state: RootState) => state.chat.messagesHome
  );
  const connectedUsers = useSelector(
    (state: RootState) => state.chat.connectedUsers
  );
  const userId = useSelector((state: RootState) => state.auth.userId);

  // Eventos do WebSocket
  useEffect(() => {
    socket.on("private message", (data: Messages) => {
      dispatch(newMessage(data));
      dispatch(addMessagesHome(data));
    });

    socket.on("users_online", (data: string[] | []) => {
      dispatch(usersConnected(data));
    });

    socket.on("user_online", (data: string) => {
      dispatch(addConnection(data));
    });

    socket.on("user_offline", (data: string) => {
      dispatch(removeConnection(data));
    });

    socket.on("no_id", () => {
      dispatch(clearToken());
      socket.disconnect();
      window.location.reload();
    });

    socket.on("double_connection", () => {
      dispatch(clearToken());
      window.location.reload();
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleNavigate = (contactId: string) => {
    dispatch(setChatting({ contactId, isChatting: true }));
    navigate(`/chat/${contactId}`);
  };

  const handleChat = (contactId: string) => {
    dispatch(setChatting({ contactId, isChatting: true }));
  };

  const messageData = (created: Date) => {
    const newDate = new Date(created);
    const dateHours = newDate.getHours();
    const dateMinutes = newDate.getMinutes();
    const dateMonth = newDate.getMonth();
    const dateDay = newDate.getDate();
    const dateYear = newDate.getFullYear();
    const date = `${newDate.getDate()}${newDate.getMonth()}`;

    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const dateToday = `${today.getDate()}${today.getMonth()}`;

    if (dateToday === date) {
      if (dateHours < 10 && dateMinutes < 10) {
        return `0${dateHours}:0${dateMinutes}`;
      } else if (dateHours < 10) {
        return `0${dateHours}:${dateMinutes}`;
      } else if (dateMinutes < 10) {
        return `${dateHours}:0${dateMinutes}`;
      } else {
        return `${dateHours}:${dateMinutes}`;
      }
    } else if (todayMonth === dateMonth && todayDay - 1 === dateDay) {
      return "Ontem";
    } else if (todayMonth - 1 === dateMonth && todayDay - 1 === 0) {
      return "Ontem";
    } else if (todayMonth - 1 === -1 && todayDay - 1 === 0) {
      return "Ontem";
    } else {
      return `${dateDay}/${dateMonth + 1}/${dateYear}`;
    }
  };

  const sortMessagesData = (data: DataConnection[]) => {
    const sortedArray = data.slice().sort((a, b) => {
      return JSON.parse(a.message.createdAt) < JSON.parse(b.message.createdAt)
        ? 1
        : JSON.parse(a.message.createdAt) > JSON.parse(b.message.createdAt)
        ? -1
        : 0;
    });

    return sortedArray;
  };

  return data ? (
    <div
      className={
        data.connections.length > 0
          ? styles.container
          : styles.containerNoMessage
      }
    >
      {data.connections.length === 0 ? (
        <p className={styles.noMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        sortMessagesData(messagesHome).map((i) => {
          const func: Function = width > 900 ? handleChat : handleNavigate;

          return (
            <div
              className={
                cId === i.userId && width > 900
                  ? `${styles.message} ${styles.active}`
                  : styles.message
              }
              key={uuidv4()}
              onClick={() => func(i.userId)}
            >
              <div className={styles.messageUser}>
                <div
                  className={
                    connectedUsers.some((item) => item === i.userId)
                      ? `${styles.userAvatar} ${styles.online}`
                      : styles.userAvatar
                  }
                >
                  {i.avatar !== "" ? (
                    <img src={i.avatar} alt="User Avatar" />
                  ) : (
                    baseAvatar
                  )}
                </div>
                <div
                  className={
                    cId === i.userId && width > 900
                      ? `${styles.userInfo} ${styles.userActive}`
                      : styles.userInfo
                  }
                >
                  <p>{i.fullName}</p>
                  {i.message ? (
                    <p>
                      {i.message.sender === userId ? `Você:` : ""}{" "}
                      {i.message.message.length >= 25
                        ? `${i.message.message.slice(0, 25)}...`
                        : i.message.message}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className={styles.infoRight}>
                <div className={styles.messageInfo}>
                  {i.message ? (
                    <p>{messageData(JSON.parse(i.message.createdAt))}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
                {i.notRead > 0 && (
                  <div className={styles.notRead}>
                    <p>{i.notRead}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  ) : (
    <div>...</div>
  );
}

export default HomeMessages;
