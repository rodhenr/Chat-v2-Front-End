import React, { useState } from "react";

import socket from "../../socket";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { addMessagesHome, newMessage } from "../../features/chat/chatSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/SendMessage.module.scss";

function SendMessage() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const cId = useSelector((state: RootState) => state.chat.contactId);
  const userId = useSelector((state: RootState) => state.auth.userId);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setMessage(text);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (message === "") return;

    try {
      const newMsg = {
        createdAt: JSON.stringify(new Date()),
        message,
        read: false,
        receiver: cId,
        sender: userId,
      };

      socket.emit("private message", {
        newMessage: newMsg,
      });

      dispatch(newMessage(newMsg));
      dispatch(addMessagesHome(newMsg));
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeySubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (message === "" || e.key !== "Enter") return;

    try {
      const newMsg = {
        createdAt: JSON.stringify(new Date()),
        message,
        read: false,
        receiver: cId,
        sender: userId,
      };

      socket.emit("private message", {
        newMessage: newMsg,
      });

      dispatch(newMessage(newMsg));
      dispatch(addMessagesHome(newMsg));
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
        onKeyDown={(e) => handleKeySubmit(e)}
      />
      <button
        type="button"
        className={styles.sendButton}
        onClick={(e) => handleSubmit(e)}
        disabled={!message}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </div>
  );
}

export default SendMessage;
