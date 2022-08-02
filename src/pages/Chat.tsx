import ChatHeader from "../components/Chat/ChatHeader";
import ChatMessages from "../components/Chat/ChatMessages";
import SendMessage from "../components/Chat/SendMessage";
import { useChatInfoQuery } from "../features/chat/chatApiSlice";
import { useParams } from "react-router-dom";

import styles from "../styles/Chat/ChatMobile.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setChatting, setMessages } from "../features/chat/chatSlice";

function Chat() {
  const dispatch = useDispatch();
  let params = useParams();
  const contactId = params.contactId!;

  useEffect(() => {
    dispatch(setChatting({ contactId, isChatting: false }));
  }, [dispatch, contactId]);

  const { data } = useChatInfoQuery(contactId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data === undefined) return;
    dispatch(setMessages(data.messages));
  }, [data, dispatch]);

  return (
    <div className={styles.container}>
      <ChatHeader />
      <ChatMessages />
      <SendMessage />
    </div>
  );
}

export default Chat;
