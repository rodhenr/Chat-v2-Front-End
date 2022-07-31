import { useNavigate } from "react-router";

import { useParams } from "react-router-dom";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/ChatHeader.module.scss";

function ChatHeader() {
  const navigate = useNavigate();
  const params = useParams();
  const contactId = params.contactId!;

  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  const data =
    chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data?.contactInfo;

  const handleNavigate = () => {
    navigate("/chat");
  };

  return data ? (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => {
          handleNavigate();
        }}
      />
      <div className={styles.avatar}>
        {data.avatar === "" ? (
          baseAvatar
        ) : (
          <img src={data.avatar} alt="User avatar" />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.infoName}>{data.fullName}</p>
        <p className={styles.infoStatus}>ID: {data.contactId}</p>
      </div>
    </div>
  ) : (
    <div>...</div>
  );
}

export default ChatHeader;
