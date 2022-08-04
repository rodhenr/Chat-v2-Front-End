import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setChatting, setMessages, setMyId } from "../features/chat/chatSlice";
import { useChatInfoQuery } from "../features/chat/chatApiSlice";

import socket from "../socket";

import ChatHeader from "../components/Chat/ChatHeader";
import ChatMessagesMobile from "../components/Chat/ChatMessagesMobile";
import SendMessage from "../components/Chat/SendMessage";

import styles from "../styles/Chat/ChatMobile.module.scss";

function Chat() {
  const dispatch = useDispatch();

  let params = useParams();
  const contactId = params.contactId!;

  const userId = useSelector((state: RootState) => state.auth.userId);

  const { data } = useChatInfoQuery(contactId, {
    refetchOnMountOrArgChange: true,
  });

  // Conexão com o websocket
  useEffect(() => {
    socket.auth = { id: userId };
    socket.connect();
  }, [userId]);

  // Atualiza o nome do contato alvo
  useEffect(() => {
    dispatch(setChatting({ contactId, isChatting: false }));
    dispatch(setMyId(userId));
  }, [contactId, dispatch, userId]);

  // Salva as mensagens na store
  useEffect(() => {
    if (data === undefined) return;
    dispatch(setMessages(data.messages));
  }, [data]);

  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatMessagesMobile />
      <SendMessage />
    </div>
  );
}

export default Chat;
