import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/Logo.module.scss";

function Logo() {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faCommentDots} />
      <h2>
        WS<span>CHAT</span>
      </h2>
    </div>
  );
}

export default Logo;
