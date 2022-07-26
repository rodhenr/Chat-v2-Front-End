import { useNavigate } from "react-router";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { loginError, loginData } from "../features/auth/loginSlice";
import { setToken } from "../features/auth/authSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import LoginInputs from "../components/LoginInputs";

import styles from "../styles/Login.module.scss";

interface ErrorType {
  data: {
    error: string;
  };
  status: number;
}

function Login() {
  const data = useSelector((state: RootState) => state.login.login);
  const error = useSelector((state: RootState) => state.login.errorMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const userToken = await login(data).unwrap(); // Somente captura erros se usar unwrap
      dispatch(
        loginData({
          email: "",
          password: "",
        })
      );

      dispatch(setToken(userToken.acessToken));

      navigate("/?");
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o erro
      dispatch(loginError(error.data.error));
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
      <div className={styles.login}>
        <p className={styles.errorMessage}>{error}</p>
        <h1 className={styles.loginTitle}>LOGIN</h1>
        <div className={styles.form}>
          <LoginInputs />
          <p className={styles.forgotPassword}>Esqueceu sua senha?</p>
          <div className={styles.buttonLogin} onClick={() => handleLogin()}>
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
