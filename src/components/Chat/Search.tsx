import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useAddUserMutation } from "../../features/chat/chatApiSlice";
import styles from "../../styles/Chat/Search.module.scss";

function Search() {
  const [search, setSearch] = useState("");
  const [addUser] = useAddUserMutation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (search.length < 6) return;

    if (e.key === "Enter") {
      try {
        const add = await addUser(search);

        if (add.hasOwnProperty("error")) {
          alert("Usuário não encontrado!");
        } else {
          alert("Usuário adicionado com sucesso!");
        }
        setSearch("");
      } catch (err) {
        alert("Ocorreu um erro no servidor...");
      }
    }
  };

  return (
    <div className={styles.container}>
      <input
        maxLength={6}
        type="text"
        placeholder="Procurar um usuário pela ID"
        value={search}
        onChange={(e) => {
          handleInput(e);
        }}
        onKeyDown={(e) => {
          handleSearch(e);
        }}
      />
      <button className={styles.searchButton}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

export default Search;
