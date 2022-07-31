import { useNavigate } from "react-router-dom";

import avatar from "../../images/avatar.webp";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/Messages.module.scss";

function Messages() {
  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState();
  const userData = data?.data;
  const navigate = useNavigate();
  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const handleNavigate = (contactId: string) => {
    navigate(`/chat/${contactId}`);
  };

  return userData ? (
    <div
      className={
        userData?.messages.length > 0
          ? styles.container
          : styles.containerNoMessage
      }
    >
      {userData?.messages.length === 0 ? (
        <p className={styles.noMessage}>Nenhuma mensagem para exibir</p>
      ) : (
        userData?.messages.map((i, index) => {
          let id = "";

          if (i.sender) id = i.sender;

          return (
            <div
              className={styles.message}
              key={index}
              onClick={() => handleNavigate(id)}
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
                    {i.sender === userData.userId ? `Você:` : ""}{" "}
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
