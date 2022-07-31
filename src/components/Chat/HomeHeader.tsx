import { useDispatch } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/HomeHeader.module.scss";

function HomeHeader() {
  const data = chatApiSlice.endpoints.mainChatInfo.useQueryState();
  const userData = data?.data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={userData?.avatar} alt="User Avatar" />;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <div className={styles.container}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {userData?.avatar === "" ? baseAvatar : customAvatar}
        </div>
        <div className={styles.info}>
          <p className={styles.infoName}>{userData?.fullName}</p>
          <p className={styles.infoId}>ID: {userData?.userId}</p>
        </div>
      </div>
      <div className={styles.logout}>
        <p onClick={() => handleLogout()}>SAIR</p>
      </div>
    </div>
  );
}

export default HomeHeader;
