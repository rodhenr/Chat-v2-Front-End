import styles from "../styles/Register.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCommentDots } from "@fortawesome/free-solid-svg-icons";

function Register() {
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
          <input type="text" placeholder="Usário" />
          <input type="email" placeholder="E-Mail" />
          <input type="password" placeholder="Senha" />
          <input type="password" placeholder="Repira a senha" />
        </div>
        <div className={styles.buttonRegister}>
          <button>REGISTRAR</button>
        </div>
        <p className={styles.login}>
          Já tem uma conta? <span>Faça Login!</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
