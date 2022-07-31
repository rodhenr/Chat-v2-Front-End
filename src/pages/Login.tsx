import { useNavigate } from "react-router";

import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { loginError, loginData } from "../features/auth/loginSlice";
import { setToken } from "../features/auth/authSlice";
import Logo from "../components/Chat/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import LoginInputs from "../components/LoginInputs";

import styles from "../styles/Login.module.scss";

interface ErrorType {
  data: {
    error: string | string[];
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

      dispatch(setToken(userToken));

      navigate("/chat");
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o err
      if (!error?.status) {
        dispatch(loginError("Sem resposta do servidor"));
      } else if (error?.status === 400) {
        dispatch(loginError(error.data.error[0]));
      } else if (error?.status === 401) {
        dispatch(loginError("E-mail e/ou senha incorreto(s)!"));
      } else {
        dispatch(loginError("Falha no login!"));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.login}>
        <div className={styles.loginInfos}>
          <p className={styles.errorMessage}>{error}</p>
          <h1 className={styles.loginTitle}>LOGIN</h1>
        </div>

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
