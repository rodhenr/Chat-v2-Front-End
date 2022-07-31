import { chatApiSlice } from "../../features/chat/chatApiSlice";

import { useParams } from "react-router-dom";

import styles from "../../styles/Chat/ChatMessages.module.scss";

function ChatMessages() {
  let params = useParams();
  const contactId = params.contactId!;
  const data = chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data;

  return data ? (
    <div className={styles.container}>
      {data.messageInfo.map((i) => {
        return (
          <div
            className={
              i.receiver === contactId
                ? `${styles.singleMessage} ${styles.myMessage}`
                : `${styles.singleMessage} ${styles.userMessage}`
            }
            key={i._id}
          >
            <p>{i.message}</p>
            <p className={styles.messageHour}>{`${new Date(
              i.createdAt
            ).getHours()}:${
              new Date(i.createdAt).getMinutes() < 10
                ? `0${new Date(i.createdAt).getMinutes()}`
                : new Date(i.createdAt).getMinutes()
            }`}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <div>Carregando...</div>
  );
}

export default ChatMessages;
