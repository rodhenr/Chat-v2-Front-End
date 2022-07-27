import styles from "../styles/Chatting.module.scss";
import ChatHeader from "./ChatHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface MessagesReceived {
  sender: string;
  receiver: string;
  message: string;
  date: Date;
}

function Chatting() {
  const receivedMessages: MessagesReceived[] = [
    {
      sender: "Rodrigo Henrique",
      receiver: "Usuário Aleatório",
      message: "Uma mensagem",
      date: new Date(),
    },
    {
      sender: "Usuário Aleatório",
      receiver: "Rodrigo Henrique",
      message: "Alguma outra mensagem bem grande",
      date: new Date(),
    },
    {
      sender: "Rodrigo Henrique",
      receiver: "Usuário Aleatório",
      message:
        "Uma outra mensagem grande aqui asdsadsads adasd as das dasds asa",
      date: new Date(),
    },
    {
      sender: "Usuário Aleatório",
      receiver: "Rodrigo Henrique",
      message: "Outra mensagem",
      date: new Date(),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.chatHeader}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <ChatHeader />
      </div>
      <div className={styles.messages}>
        {receivedMessages.map((i) => {
          return (
            <div
              className={
                i.sender === "Rodrigo Henrique"
                  ? `${styles.singleMessage} ${styles.myMessage}`
                  : `${styles.singleMessage} ${styles.userMessage}`
              }
            >
              <p>{i.message}</p>
              <p className={styles.messageHour}>{`${i.date.getHours()}:${i.date.getMinutes()}`}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.sendMessage}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Digite a sua mensagem..."
        />
        <button className={styles.sendButton}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default Chatting;
