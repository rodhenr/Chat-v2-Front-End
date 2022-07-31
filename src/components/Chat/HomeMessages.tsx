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

          return (
            <div
              className={styles.message}
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
                <div className={styles.userInfo}>
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
                <p></p>
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
