import { useDispatch } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";

import socket from "../../socket";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/HomeHeader.module.scss";
import { useEffect } from "react";

function HomeHeader() {
  const dispatch = useDispatch();
  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={data?.avatar} alt="User Avatar" />;

  const handleLogout = () => {
    dispatch(clearToken());
    socket.disconnect();
  };

  // Proteção para deslogar o usuário
  useEffect(() => {
    socket.on("no_id", () => {
      handleLogout();
    });

    return () => {
      socket.off("no_id");
    };
  }, []);

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
