import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";

import socket from "../../socket";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/HomeHeader.module.scss";

function HomeHeader() {
  const dispatch = useDispatch();
  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState().data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={data?.avatar} alt="User Avatar" />;

  const memoizedHandleLogout = useCallback(() => {
    dispatch(clearToken());
    socket.disconnect();
  }, [dispatch]);

  // Proteção para deslogar o usuário
  useEffect(() => {
    socket.on("no_id", () => {
      memoizedHandleLogout();
    });

    socket.on("double_connection", () => {
      dispatch(clearToken());
    });

    return () => {
      socket.off("no_id");
      socket.off("double_connection");
    };
  }, [dispatch, memoizedHandleLogout]);

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
        <p onClick={() => memoizedHandleLogout()}>SAIR</p>
      </div>
    </div>
  );
}

export default HomeHeader;
