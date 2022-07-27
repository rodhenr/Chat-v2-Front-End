import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import styles from "../../styles/Chat/Search.module.scss";

function Search() {
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Procurar um usuário" />
      <button className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default Search;
