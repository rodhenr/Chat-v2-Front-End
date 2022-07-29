import { useNavigate } from "react-router-dom";

import { chatApiSlice } from "../../features/chat/chatApiSlice";
import avatar from "../../images/avatar.webp";

import styles from "../../styles/Chat/Messages.module.scss";

function Messages() {
  const data = chatApiSlice.endpoints.getInfoUser.useQueryState();
  const userData = data?.data;
  const navigate = useNavigate();
  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const handleNavigate = (id: string) => {
    navigate(`/chat/${id}`);
  };

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
        userData.messages.map((i) => {
          const { sender, receiver } = i;
          let id: string;

          if(sender) {
            id = sender._id
          } 
          
          if(receiver) {
            id = receiver._id
          }

          return (
            <div
              className={styles.message}
              key={i._id}
              onClick={() => handleNavigate(id)}
            >
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
