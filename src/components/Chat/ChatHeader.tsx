import { useNavigate } from "react-router";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/ChatHeader.module.scss";

function ChatHeader() {
  const navigate = useNavigate();
  const params = useParams();
  const contactId = params.contactId!;

  const width = useSelector((state: RootState) => state.chat.width);
  const cId = useSelector((state: RootState) => state.chat.contactId);

  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  let data;

  width > 900
    ? (data =
        chatApiSlice.endpoints.chatInfo.useQueryState(cId).data?.contactInfo)
    : (data =
        chatApiSlice.endpoints.chatInfo.useQueryState(contactId).data?.contactInfo);

  //preciso fazer mobile(contactId) e desktop (cId)

  const handleNavigate = () => {
    navigate("/chat");
  };

  const mobile = (
    <div className={styles.container}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        onClick={() => {
          handleNavigate();
        }}
      />
      <div className={styles.avatar}>
        {data?.avatar === "" ? (
          baseAvatar
        ) : (
          <img src={data?.avatar} alt="User avatar" />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.infoName}>{data?.fullName}</p>
        <p className={styles.infoStatus}>ID: {data?.contactId}</p>
      </div>
    </div>
  );

  const desktop = (
    <div className={styles.container}>
      <div className={styles.avatar}>
        {data?.avatar === "" ? (
          baseAvatar
        ) : (
          <img src={data?.avatar} alt="User avatar" />
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.infoName}>{data?.fullName}</p>
        <p className={styles.infoStatus}>ID: {data?.contactId}</p>
      </div>
    </div>
  );

  return width > 900 ? desktop : mobile;
}

export default ChatHeader;
