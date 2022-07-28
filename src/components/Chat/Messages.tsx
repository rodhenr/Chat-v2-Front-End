import avatar from "../../images/avatar.webp";
import avatarM from "../../images/avatar_m.png";

import styles from "../../styles/Chat/Messages.module.scss";

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

function Messages() {
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
      status: "offline",
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
      status: "offline",
      user: "Alguém Aleatório",
      userAvatar: avatarM,
    },
  ];

  return (
    <div
      className={
        messages.length > 0 ? styles.container : styles.containerNoMessage
      }
    >
      {messages.length === 0 ? (
        <p className={styles.noMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        messages.map((i, index) => {
          return (
            <div className={styles.message} key={index}>
              <div className={styles.messageUser}>
                <div
                  className={
                    i.status === "online"
                      ? `${styles.userAvatar} ${styles.online}`
                      : styles.userAvatar
                  }
                >
                  {i.userAvatar !== "none" ? (
                    <img src={i.userAvatar} alt="User Avatar" />
                  ) : (
                    baseAvatar
                  )}
                </div>
                <div className={styles.userInfo}>
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
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Messages;
