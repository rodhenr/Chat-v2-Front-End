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
  const width = useSelector((state: RootState) => state.chat.width);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cId = useSelector((state: RootState) => state.chat.contactId);
  const isChatting = useSelector((state: RootState) => state.chat.isChatting);

  useChatInfoQuery(isChatting ? cId : skipToken);

  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;

  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const handleNavigate = (contactId: string) => {
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
        data.messages.length > 0 ? styles.container : styles.containerNoMessage
      }
    >
      {data.messages.length === 0 ? (
        <p className={styles.noMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        data.messages.map((i, index) => {
          const func: Function = width > 900 ? handleChat : handleNavigate;
          const date = messageData(i.createdAt);

          return (
            <div
              className={
                cId === i.contactId
                  ? `${styles.message} ${styles.active}`
                  : styles.message
              }
              key={index}
              onClick={() => func(i.contactId!)}
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
                    cId === i.contactId
                      ? `${styles.userInfo} ${styles.userActive}`
                      : styles.userInfo
                  }
                >
                  <p>{i.fullName}</p>
                  <p>
                    {i.sender === data.userId ? `Você:` : ""}{" "}
                    {i.message.length >= 25
                      ? `${i.message.slice(0, 25)}...`
                      : i.message}
                  </p>
                </div>
              </div>
              <div className={styles.messageInfo}>
                <p>{date}</p>
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
