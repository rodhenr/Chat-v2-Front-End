import { useState } from "react";

import socket from "../../socket";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { changeMessages } from "../../features/chat/messagesSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/SendMessage.module.scss";

function SendMessage() {
  const dispatch = useDispatch();
  let params = useParams();
  const contactId = params.contactId!;
  const [message, setMessage] = useState("");

  const cId = useSelector((state: RootState) => state.chat.contactId);
  const storeMessages = useSelector((state: RootState) => state.messages.messages);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessage(text);
  };

  const handleSubmit = async () => {
    if (message === "") return;

    try {
      const newMessage = {
        createdAt: JSON.stringify(new Date()),
        message,
        receiver: contactId || cId,
        sender: userId,
      };

      socket.emit("private message", {
        newMessage,
      });

      dispatch(changeMessages([...storeMessages, newMessage]));

      window.localStorage.setItem(
        "messages",
        JSON.stringify([...storeMessages, newMessage])
      );

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
