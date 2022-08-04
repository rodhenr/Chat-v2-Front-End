import { useNavigate } from "react-router";

import {
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { loginError, loginData } from "../features/auth/loginSlice";
import { setData, setError } from "../features/auth/registerSlice";
import { setToken } from "../features/auth/authSlice";
import Logo from "../components/Chat/Logo";

import styles from "../styles/Auth.module.scss";
import { useState } from "react";

interface ErrorType {
  data: {
    error: string | string[];
  };
  status: number;
}

function Login() {
  const dataLogin = useSelector((state: RootState) => state.login.login);
  const dataRegister = useSelector((state: RootState) => state.register.data);
  const error = useSelector((state: RootState) => state.login.errorMsg);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLogin, setIsLogin] = useState<null | boolean>(null);

  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegisterInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const userToken = await login(dataLogin).unwrap(); // Somente captura erros se usar unwrap
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

  const handleRegister = async () => {
    if (dataRegister.password !== dataRegister.confirmPassword) {
      dispatch(setError("As senhas devem ser iguais!"));
      return;
    }

    try {
      await register(dataRegister).unwrap(); // Somente captura erros se usar unwrap
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
      <div className={styles.main}>
        <div
          className={
            isLogin === null
              ? styles.column
              : isLogin
              ? `${styles.column} ${styles.activeLogin}`
              : `${styles.column} ${styles.activeRegister}`
          }
        >
          {isLogin ? (
            <p>REGISTRE-SE AGORA E COMEÇE A CONVERSAR</p>
          ) : (
            <p>CONECTE-SE COM OS SEUS AMIGOS!</p>
          )}
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>
        <div className={styles.login}>
          <div className={styles.infos}>
            <p className={styles.errorMessage}>{error}</p>
            <h1 className={styles.title}>LOGIN</h1>
          </div>

          <div className={styles.form}>
            <input
              name="email"
              onChange={handleInputLogin}
              placeholder="Digite seu e-mail"
              type="email"
              value={loginInfo.email}
            />
            <input
              minLength={6}
              name="password"
              onChange={handleInputLogin}
              placeholder="Digite sua senha"
              type="password"
              value={loginInfo.password}
            />
            <p className={styles.move} onClick={() => setIsLogin(!isLogin)}>
              Não possui uma conta?
            </p>
            <button className={styles.button} onClick={() => handleLogin()}>
              ENTRAR
            </button>
          </div>
        </div>
        <div className={styles.register}>
          <div className={styles.infos}>
            <p className={styles.errorMessage}>{error}</p>
            <h1 className={styles.title}>REGISTRO</h1>
          </div>
          <div className={styles.form}>
            <input
              minLength={3}
              name="firstName"
              onChange={handleInputRegister}
              placeholder="Nome"
              type="text"
              value={registerInfo.firstName}
            />
            <input
              minLength={3}
              name="lastName"
              onChange={handleInputRegister}
              placeholder="Sobrenome"
              type="text"
              value={registerInfo.lastName}
            />
            <input
              name="email"
              onChange={handleInputRegister}
              placeholder="E-mail"
              type="email"
              value={registerInfo.email}
            />
            <input
              minLength={6}
              name="password"
              onChange={handleInputRegister}
              placeholder="Senha"
              type="password"
              value={registerInfo.password}
            />
            <input
              minLength={6}
              name="confirmPassword"
              onChange={handleInputRegister}
              placeholder="Repita a senha"
              type="password"
              value={registerInfo.confirmPassword}
            />
            <p className={styles.move} onClick={() => setIsLogin(!isLogin)}>
              Já possui uma conta?
            </p>
            <button className={styles.button} onClick={() => handleRegister()}>
              REGISTRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
