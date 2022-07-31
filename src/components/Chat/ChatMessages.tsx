import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/ChatMessages.module.scss";

function ChatMessages() {
  let params = useParams();
  const contactId = params.contactId!;

  const width = useSelector((state: RootState) => state.chat.width);
  const cId = useSelector((state: RootState) => state.chat.contactId);

  let data;

  width > 900
    ? (data = chatApiSlice.endpoints.chatInfo.useQueryState(cId).data)
    : (data = chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data);

  return data ? (
    <div className={styles.container}>
      {data.messageInfo.map((i) => {
        return (
          <div
            className={
              i.receiver === contactId || i.receiver === cId
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
