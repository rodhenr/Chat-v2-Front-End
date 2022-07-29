import UserInfoChat from "../components/Chat/UserInfoChat";
import ChatMessages from "../components/Chat/ChatMessages";
import SendMessage from "../components/Chat/SendMessage";
import { useGetChatInfoQuery } from "../features/chat/chatApiSlice";
import { useParams } from "react-router-dom";

import styles from "../styles/Chat/ChatMobile.module.scss";

function ChatMobile() {
  let { id } = useParams();

  if (id === undefined) {
    id = "";
  }

  const { isSuccess } = useGetChatInfoQuery(id);
  // fazer uma requisição GET nova para pegar os dados dessa conversa específica
  // popular os dados de acordo com o GET

  return (
    <div className={styles.container}>
      <UserInfoChat id={id} />
      <ChatMessages id={id} />
      <SendMessage />
    </div>
  );
}

export default ChatMobile;
