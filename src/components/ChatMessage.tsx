import styles from "../styles/Chat.module.scss";
import avatar from "../images/avatar.webp";

interface message {
  lastSeen: string;
  lastMessage: string;
  status: string;
  user: string;
  userAvatar: string;
}

function ChatMessage() {
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const messages: message[] = [
    {
      lastSeen: "20m",
      lastMessage: "Como vão as coisas?",
      status: "online",
      user: "Pessoa Aleatória",
      userAvatar: "none",
    },
  ];

  return (
    <div className={styles.messageContainer}>
      {messages.map((i) => {
        return (
          <div className={styles.message}>
            <div className={styles.messageUser}>
              <div className={styles.messageUserAvatar}>
                {i.userAvatar !== "none" ? i.userAvatar : baseAvatar}
              </div>
              <div className={styles.messageUserInfo}>
                <p>{i.user}</p>
                <p>{i.lastMessage}</p>
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
      })}
    </div>
  );
}

export default ChatMessage;
