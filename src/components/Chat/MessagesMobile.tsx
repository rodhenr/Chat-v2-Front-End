import { chatApiSlice } from "../../features/chat/chatApiSlice";
import avatar from "../../images/avatar.webp";

import styles from "../../styles/Chat/Messages.module.scss";

function Messages() {
  const data = chatApiSlice.endpoints.getInfoUser.useQueryState();
  const userData = data?.data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  return userData ? (
    <div
      className={
        userData.messages.length > 0
          ? styles.container
          : styles.containerNoMessage
      }
    >
      {userData.messages.length === 0 ? (
        <p className={styles.noMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        userData.messages.map((i, index) => {
          return (
            <div className={styles.message} key={index}>
              <div className={styles.messageUser}>
                <div
                  className={
                    i.sender?.status === "online" ||
                    i.receiver?.status === "online"
                      ? `${styles.userAvatar} ${styles.online}`
                      : styles.userAvatar
                  }
                >
                  {i.sender !== null && i.sender?.avatar !== "" ? (
                    <img src={i.sender?.avatar} alt="User Avatar" />
                  ) : i.receiver !== null && i.receiver?.avatar !== "" ? (
                    <img src={i.receiver?.avatar} alt="User Avatar" />
                  ) : (
                    baseAvatar
                  )}
                </div>
                <div className={styles.userInfo}>
                  <p>
                    {i.sender
                      ? `${i.sender?.firstName} ${i.sender?.lastName}`
                      : `${i.receiver?.firstName} ${i.receiver?.lastName}`}
                  </p>
                  <p>
                    {i.receiver ? `Você:` : ""}{" "}
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

export default Messages;
