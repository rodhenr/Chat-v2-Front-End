import styles from "../styles/Chat.module.scss";
import avatar from "../images/avatar_m.png";

function ChatHeader() {
  const baseAvatar = <img src={avatar} alt="User Avatar" />;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerUser}>
        <div className={styles.headerAvatar}>{baseAvatar}</div>
        <div className={styles.headerUserInfo}>
          <p className={styles.headerName}>Rodrigo Henrique</p>
          <p className={styles.headerStatus}>Online</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
