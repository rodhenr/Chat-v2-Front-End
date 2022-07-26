import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import LoginInputs from "../components/LoginInputs";

import styles from "../styles/Login.module.scss";

function Login() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faCommentDots} />
        <h2>
          WS<span>CHAT</span>
        </h2>
      </div>
      <div className={styles.login}>
        <h1 className={styles.loginTitle}>LOGIN</h1>
        <div className={styles.form}>
          <LoginInputs />
          <p className={styles.forgotPassword}>Esqueceu sua senha?</p>
          <div className={styles.buttonLogin}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
        <p className={styles.register}>
          Não tem uma conta?{" "}
          <span onClick={() => navigate("/register")}>Registre-se!</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
