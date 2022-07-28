import styles from "../../styles/Chat/ChatMessages.module.scss";

interface MessagesReceived {
  sender: string;
  receiver: string;
  message: string;
  date: Date;
}

function ChatMessages() {
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
      {receivedMessages.map((i, index) => {
        return (
          <div
            className={
              i.sender === "Rodrigo Henrique"
                ? `${styles.singleMessage} ${styles.myMessage}`
                : `${styles.singleMessage} ${styles.userMessage}`
            }
            key={index}
          >
            <p>{i.message}</p>
            <p className={styles.messageHour}>{`${i.date.getHours()}:${
              i.date.getMinutes() < 10
                ? `0${i.date.getMinutes()}`
                : i.date.getMinutes()
            }`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default ChatMessages;
