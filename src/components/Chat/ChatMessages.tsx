import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/ChatMessages.module.scss";
import { useRef } from "react";

function ChatMessages() {
  let params = useParams();
  const contactId = params.contactId!;
  const lastDay = useRef("");

  const width = useSelector((state: RootState) => state.chat.width);
  const cId = useSelector((state: RootState) => state.chat.contactId);

  let data;

  width > 900
    ? (data = chatApiSlice.endpoints.chatInfo.useQueryState(cId).data)
    : (data = chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data);

  const months = (m: number) => {
    switch (m) {
      case 0:
        return "Janeiro";
      case 1:
        return "Fevereiro";
      case 2:
        return "Março";
      case 3:
        return "Abril";
      case 4:
        return "Maio";
      case 5:
        return "Junho";
      case 6:
        return "Julho";
      case 7:
        return "Agosto";
      case 8:
        return "Setembro";
      case 9:
        return "Outubro";
      case 10:
        return "Novembro";
      case 11:
        return "Dezembro";
    }
  };

  const checkDay = (created: Date) => {
    const newDate = new Date(created);
    const date = `${newDate.getDate()} de ${months(newDate.getMonth())}`;

    if (date === lastDay.current) return null;

    lastDay.current = date;
    return date;
  };

  return data ? (
    <div className={styles.container}>
      {data.messageInfo.map((i) => {
        const date = checkDay(i.createdAt);

        return (
          <div className={styles.containerMessage} key={i._id}>
            {date ? (
              <div className={styles.dayMonth}>
                <p>{date}</p>
              </div>
            ) : null}
            <div
              className={
                i.receiver === contactId || i.receiver === cId
                  ? `${styles.singleMessage} ${styles.myMessage}`
                  : `${styles.singleMessage} ${styles.userMessage}`
              }
            >
              <p>{i.message}</p>
              <p className={styles.messageHour}>{`${new Date(
                i.createdAt
              ).getHours()}:${
                new Date(i.createdAt).getMinutes() < 10
                  ? `0${new Date(i.createdAt).getMinutes()}`
                  : new Date(i.createdAt).getMinutes()
              }`}</p>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Carregando...</div>
  );
}

export default ChatMessages;
