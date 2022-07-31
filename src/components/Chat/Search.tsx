import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useAddUserMutation } from "../../features/chat/chatApiSlice";
import styles from "../../styles/Chat/Search.module.scss";

function Search() {
  const [search, setSearch] = useState("");
  const [addUser] = useAddUserMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async () => {
    if (search === "") return;

    try {
      await addUser(search);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Procurar um usuário pela ID"
        value={search}
        onChange={(e) => {
          handleInput(e);
        }}
      />
      <button className={styles.searchButton} onClick={() => handleSearch()}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default Search;
