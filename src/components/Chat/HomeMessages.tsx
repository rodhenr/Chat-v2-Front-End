import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setChatting } from "../../features/chat/chatSlice";

import { skipToken } from "@reduxjs/toolkit/query";

import avatar from "../../images/avatar.webp";

import {
  chatApiSlice,
  useChatInfoQuery,
} from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/HomeMessages.module.scss";

function HomeMessages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const width = useSelector((state: RootState) => state.chat.width);
  const cId = useSelector((state: RootState) => state.chat.contactId);
  const isChatting = useSelector((state: RootState) => state.chat.isChatting);
  const messages = useSelector((state: RootState) => state.chat.messages);

  useChatInfoQuery(isChatting ? cId : skipToken);

  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;

  const handleNavigate = (contactId: string) => {
    dispatch(setChatting({ contactId, isChatting: true }));
    navigate(`/chat/${contactId}`);
  };

  const handleChat = (contactId: string) => {
    dispatch(setChatting({ contactId, isChatting: true }));
  };

  const messageData = (created: Date) => {
    const newDate = new Date(created);
    const dateMonth = newDate.getMonth();
    const dateDay = newDate.getDate();
    const dateYear = newDate.getFullYear();
    const date = `${newDate.getDate()}${newDate.getMonth()}`;

    const today = new Date();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();
    const dateToday = `${today.getDate()}${today.getMonth()}`;

    if (dateToday === date) {
      return `${newDate.getHours()}:${newDate.getMinutes()}`;
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
        data.connections.map((i, index) => {
          const lastMessage = messages
            .slice()
            .reverse()
            .find(
              (item) => item.sender === i.userId || item.receiver === i.userId
            );
          const func: Function = width > 900 ? handleChat : handleNavigate;

          return (
            <div
              className={
                cId === i.userId && width > 900
                  ? `${styles.message} ${styles.active}`
                  : styles.message
              }
              key={index}
              onClick={() => func(i.userId)}
            >
              <div className={styles.messageUser}>
                <div
                  className={
                    i.status === "online"
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
                    cId === i.userId
                      ? `${styles.userInfo} ${styles.userActive}`
                      : styles.userInfo
                  }
                >
                  <p>{`${i.firstName} ${i.lastName}`}</p>
                  {lastMessage !== undefined ? (
                    <p>
                      {i.userId !== data.userId ? `Você:` : ""}{" "}
                      {lastMessage?.message?.length >= 25
                        ? `${lastMessage?.message.slice(0, 25)}...`
                        : lastMessage?.message}
                    </p>
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
              <div className={styles.messageInfo}>
                {lastMessage !== undefined ? (
                  <p>{messageData(lastMessage?.createdAt)}</p>
                ) : (
                  <p></p>
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
