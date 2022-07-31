import ChatHeader from "../components/Chat/ChatHeader";
import ChatMessages from "../components/Chat/ChatMessages";
import SendMessage from "../components/Chat/SendMessage";
import { useChatInfoQuery } from "../features/chat/chatApiSlice";
import { useParams } from "react-router-dom";

import styles from "../styles/Chat/ChatMobile.module.scss";

function Chat() {
  let params = useParams();
  const contactId = params.contactId!;

  useChatInfoQuery(contactId);

  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatMessages />
      <SendMessage />
    </div>
  );
}

export default Chat;