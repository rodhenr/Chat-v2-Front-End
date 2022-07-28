import avatar from "../../images/avatar_m.png";

import { chatApiSlice } from "../../features/chat/chatApiSlice";

import styles from "../../styles/Chat/UserInfo.module.scss";

function UserInfo() {
  const data = chatApiSlice.endpoints.getInfoUser.useQueryState();
  const userData = data?.data;
  const baseAvatar = <img src={avatar} alt="User Avatar" />;
  const customAvatar = <img src={userData?.avatar} alt="User Avatar" />;

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        {userData?.avatar === "" ? baseAvatar : customAvatar}
      </div>
      <div className={styles.info}>
        <p className={styles.infoName}>{userData?.fullName}</p>
        <p className={styles.infoStatus}>{userData?.status}</p>
      </div>
    </div>
  );
}

export default UserInfo;
