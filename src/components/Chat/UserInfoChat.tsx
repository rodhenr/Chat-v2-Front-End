import avatar from "../../images/avatar_m.png";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router";

import styles from "../../styles/Chat/UserInfoChat.module.scss";

interface Props {
  id: string;
}

function UserInfoChat({ id }: Props) {
  const navigate = useNavigate();
  const data =
    chatApiSlice.endpoints.getChatInfo.useQueryState(id).data?.chatInfo;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={data?.avatar} alt="User Avatar" />;

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
        {data.avatar === "" ? baseAvatar : customAvatar}
      </div>
      <div className={styles.info}>
        <p className={styles.infoName}>
          {`${data.firstName} ${data.lastName}`}
        </p>
        <p className={styles.infoStatus}>{data?.status}</p>
      </div>
    </div>
  ) : (
    <div>...</div>
  );
}

export default UserInfoChat;
