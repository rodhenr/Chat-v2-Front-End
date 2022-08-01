import { useDispatch } from "react-redux";
import { clearStore } from "../../features/auth/authSlice";

import socket from "../../socket";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/HomeHeader.module.scss";

function HomeHeader() {
  const dispatch = useDispatch();
  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={data?.avatar} alt="User Avatar" />;

  const handleLogout = () => {
    dispatch(clearStore());
    socket.disconnect();
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {data?.avatar === "" ? baseAvatar : customAvatar}
        </div>
        <div className={styles.info}>
          <p className={styles.infoName}>{data?.fullName}</p>
          <p className={styles.infoId}>ID: {data?.userId}</p>
        </div>
      </div>
      <div className={styles.logout}>
        <p onClick={() => handleLogout()}>SAIR</p>
      </div>
    </div>
  );
}

export default HomeHeader;
