import { useRef, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { v4 as uuidv4 } from "uuid";

import socket from "../../socket";

import { newMessage } from "../../features/chat/chatSlice";
import { checkMonth } from "../../helpers";

import styles from "../../styles/Chat/ChatMessages.module.scss";

interface Message {
  createdAt: string;
  message: string;
  read: boolean;
  receiver: string;
  sender: string;
}

function ChatMessagesMobile() {
  const dispatch = useDispatch();
  const last = useRef<HTMLDivElement>(null);
  const lastDay = useRef("");

  const cId = useSelector((state: RootState) => state.chat.contactId);
  const storeMessages = useSelector((state: RootState) => state.chat.messages);

  // enviar para o servidor que leu as mensagens desse contato
  useEffect(() => {
    socket.emit("read_message", cId);
  }, [cId]);

  // Sempre dar scroll pro fim caso haja um re-render
  useEffect(() => {
    if (last.current) {
      last.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Se receber nova mensagem
  useEffect(() => {
    socket.on("private message", (data: Message) => {
      dispatch(newMessage(data));

      if (data.sender === cId) {
        socket.emit("read_message", cId);
      }
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [cId, dispatch]);

  const checkDay = (created: Date, index: number) => {
    const newDate = new Date(created);
    const date = `${newDate.getDate()} de ${checkMonth(newDate.getMonth())}`;

    // Se for o último item do array, limpa o ref.current para o próximo render
    if (index + 1 === storeMessages.length) {
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
      {storeMessages.map((i, index) => {
        const createdAt = JSON.parse(i.createdAt);
        const date = checkDay(createdAt, index);
        const isLast = storeMessages.length === index + 1;

        return (
          <div className={styles.containerMessage} key={uuidv4()}>
            {date ? (
              <div className={styles.dayMonth}>
                <p>{date}</p>
              </div>
            ) : null}
            <div
              className={
                i.receiver === cId
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
            {isLast ? <div ref={last}></div> : null}
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessagesMobile;
