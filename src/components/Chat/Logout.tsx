import { useDispatch } from "react-redux";
import { clearToken } from "../../features/auth/authSlice";
import styles from "../../styles/Chat/Logout.module.scss";

function Logout() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <div className={styles.container}>
      <p onClick={() => handleLogout()}>SAIR</p>
    </div>
  );
}

export default Logout;
