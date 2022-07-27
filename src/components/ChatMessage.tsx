import styles from "../styles/Chat.module.scss";
import avatar from "../images/avatar.webp";
import avatarM from "../images/avatar_m.png";

interface message {
  lastSeen: string;
  lastMessage: {
    sender: string;
    message: string;
  };
  status: string;
  user: string;
  userAvatar: string;
}

function ChatMessage() {
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const messages: message[] = [
    {
      lastSeen: "20m",
      lastMessage: {
        sender: "Pessoa Aleatória",
        message: "Como vão as coisas?",
      },
      status: "online",
      user: "Pessoa Aleatória",
      userAvatar: "none",
    },
    {
      lastSeen: "2h",
      lastMessage: {
        sender: "Me",
        message: "Testando uma mensagem",
      },
      status: "online",
      user: "Alguém Aleatório",
      userAvatar: avatarM,
    },
    {
      lastSeen: "1d",
      lastMessage: {
        sender: "Outra Pessoa",
        message: "Uma grande mensagem no chat",
      },
      status: "offline",
      user: "Outra Pessoa",
      userAvatar: "none",
    },
  ];

  return (
    <div
      className={
        messages.length > 0
          ? styles.messageContainer
          : styles.messageContainerNoMessage
      }
    >
      {messages.length === 0 ? (
        <p className={styles.messageNoMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        messages.map((i) => {
          return (
            <div className={styles.message}>
              <div className={styles.messageUser}>
                <div className={styles.messageUserAvatar}>
                  {i.userAvatar !== "none" ? (
                    <img src={i.userAvatar} alt="User Avatar" />
                  ) : (
                    baseAvatar
                  )}
                </div>
                <div className={styles.messageUserInfo}>
                  <p>{i.user}</p>
                  <p>
                    {i.lastMessage.sender === "Me" ? `Você:` : ""}{" "}
                    {i.lastMessage.message.length >= 25
                      ? `${i.lastMessage.message.slice(0, 25)}...`
                      : i.lastMessage.message}
                  </p>
                </div>
              </div>

              <div className={styles.messageInfo}>
                <p>{i.lastSeen}</p>
                <div
                  className={
                    i.status === "online"
                      ? `${styles.messageInfoStatus} ${styles.messageOnline}`
                      : styles.messageInfoStatus
                  }
                ></div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatMessage;
