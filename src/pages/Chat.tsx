import UserInfo from "../components/Chat/UserInfo";
import Message from "../components/Chat/Messages";
import Search from "../components/Chat/Search";
import Logout from "../components/Chat/Logout";

import styles from "../styles/Chat/ChatMain.module.scss";

function Chat() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <UserInfo />
        <Logout />
      </div>
      <Search />
      <Message />
    </div>
  );
}

export default Chat;
