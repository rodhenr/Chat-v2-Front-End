import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

import socket from "../../socket";
import { useEffect } from "react";
import { newMessage } from "../../features/chat/chatSlice";

import styles from "../../styles/Chat/ChatMessages.module.scss";
import { useRef } from "react";

interface Message {
  createdAt: string;
  message: string;
  receiver: string;
  sender: string;
}

function ChatMessages() {
  const dispatch = useDispatch();
  let params = useParams();
  const contactId = params.contactId!;
  const lastDay = useRef("");

  const cId = useSelector((state: RootState) => state.chat.contactId);
  const storeMessages = useSelector((state: RootState) => state.chat.messages);

  const myMessages = storeMessages.filter(
    (i) =>
      i.receiver === cId ||
      i.sender === cId ||
      i.receiver === contactId ||
      i.sender === contactId
  );

  useEffect(() => {
    socket.on("private message", (data: Message) => {
      dispatch(newMessage(data));
    });
  }, [socket]);

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

  const checkDay = (created: Date, index: number) => {
    const newDate = new Date(created);
    const date = `${newDate.getDate()} de ${months(newDate.getMonth())}`;

    // Se for o último item do array, limpa o ref.current para o próximo render
    if (index + 1 === myMessages.length) {
      const check = date === lastDay.current;
      lastDay.current = "";

      if (check) {
        return null;
      } else {
        return date;
      }
    }

    if (date === lastDay.current) return null;
    lastDay.current = date;
    return date;
  };

  return (
    <div className={styles.container}>
      {myMessages.map((i, index) => {
        const createdAt = JSON.parse(i.createdAt);
        const date = checkDay(createdAt, index);

        return (
          <div className={styles.containerMessage} key={index}>
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
                createdAt
              ).getHours()}:${
                new Date(createdAt).getMinutes() < 10
                  ? `0${new Date(createdAt).getMinutes()}`
                  : new Date(createdAt).getMinutes()
              }`}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
