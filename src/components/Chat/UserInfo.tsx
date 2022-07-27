import avatar from "../../images/avatar_m.png";

import styles from "../../styles/Chat/UserInfo.module.scss";

function UserInfo() {
  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  return (
    <div className={styles.container}>
      <div className={styles.avatar}>{baseAvatar}</div>
      <div className={styles.info}>
        <p className={styles.infoName}>Rodrigo Henrique</p>
        <p className={styles.infoStatus}>Online</p>
      </div>
    </div>
  );
}

export default UserInfo;
