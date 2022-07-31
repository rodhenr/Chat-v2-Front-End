import { useState } from "react";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import {
  chatApiSlice,
  useSendMessageMutation,
} from "../../features/chat/chatApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/SendMessage.module.scss";

function SendMessage() {
  let params = useParams();
  const contactId = params.contactId!;

  const width = useSelector((state: RootState) => state.chat.width);
  const cId = useSelector((state: RootState) => state.chat.contactId);

  let data;

  width > 900
    ? (data = chatApiSlice.endpoints.chatInfo.useQueryState(cId).data)
    : (data = chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data);

  const senderId = data?.userInfo.userId!;
  const [sendDispatch] = useSendMessageMutation();
  const [message, setMessage] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessage(text);
  };

  const handleSubmit = async () => {
    if (message === "") return;

    //problema de aparecer so apos reload

    try {
      width > 900
        ? await sendDispatch({
            msg: message,
            sender: senderId,
            receiver: cId,
          })
        : await sendDispatch({
            msg: message,
            sender: senderId,
            receiver: contactId,
          });

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="message"
        placeholder="Digite a sua mensagem..."
        value={message}
        onChange={(e) => handleInput(e)}
      />
      <button
        type="button"
        className={styles.sendButton}
        onClick={() => handleSubmit()}
        disabled={!message}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}

export default SendMessage;
