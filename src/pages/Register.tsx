import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import RegisterInputs from "../components/RegisterInputs";

import styles from "../styles/Register.module.scss";

function Register() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faCommentDots} />
        <h2>
          WS<span>CHAT</span>
        </h2>
      </div>
      <div className={styles.register}>
        <div className={styles.form}>
          <RegisterInputs />
          <div className={styles.buttonRegister}>
            <button>REGISTRAR</button>
          </div>
        </div>
        <p className={styles.login}>
          Já tem uma conta?{" "}
          <span onClick={() => navigate("/")}>Faça Login!</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
