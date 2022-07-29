import { chatApiSlice } from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/ChatMessages.module.scss";

interface Props {
  id: string;
}

function ChatMessages({ id }: Props) {
  const data = chatApiSlice.endpoints.getChatInfo.useQueryState(id).data?.data;

  return data !== undefined ? (
    <div className={styles.container}>
      {data.map((i, index) => {
        return (
          <div
            className={
              i.sender === id
                ? `${styles.singleMessage} ${styles.myMessage}`
                : `${styles.singleMessage} ${styles.userMessage}`
            }
            key={index}
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
