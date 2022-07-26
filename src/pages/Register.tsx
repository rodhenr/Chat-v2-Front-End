import { useNavigate } from "react-router";

import { useRegisterMutation } from "../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setData, setError } from "../features/auth/registerSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

import RegisterInputs from "../components/RegisterInputs";

import styles from "../styles/Register.module.scss";

interface ErrorType {
  data: {
    error: string;
  };
  status: number;
}

function Register() {
  const data = useSelector((state: RootState) => state.register.data);
  const error = useSelector((state: RootState) => state.register.errMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      await register(data).unwrap(); // Somente captura erros se usar unwrap
      dispatch(
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      );
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o erro
      dispatch(setError(error.data.error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <FontAwesomeIcon icon={faCommentDots} />
        <h2>
          WS<span>CHAT</span>
        </h2>
      </div>
      <div className={styles.register}>
        <p className={styles.errorMessage}>{error}</p>
        <h1 className={styles.registerTitle}>Registro</h1>
        <div className={styles.form}>
          <RegisterInputs />
          <div className={styles.buttonRegister}>
            <button onClick={() => handleRegister()}>REGISTRAR</button>
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
