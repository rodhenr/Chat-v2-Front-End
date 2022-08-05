import { useNavigate } from "react-router";

import {
  useLoginMutation,
  useRegisterMutation,
} from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";
import Logo from "../components/Chat/Logo";

import styles from "../styles/Auth.module.scss";
import { useEffect, useState } from "react";
import { getWindowSize } from "../helpers";

interface ErrorType {
  data: {
    error: string | string[];
  };
  status: number;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState<null | boolean>(null);
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // criar um erro pro login e um erro pro register
  // limpar erros ao mudar de tela
  const handleInputLogin = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginError("");
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRegisterError("");
    setRegisterInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    try {
      const userToken = await login(loginInfo).unwrap(); // Somente captura erros se usar unwrap
      setLoginInfo({ email: "", password: "" });
      dispatch(setToken(userToken));
      navigate("/chat");
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o err
      if (!error?.status) {
        setLoginError("Sem resposta do servidor");
      } else if (error?.status === 400) {
        setLoginError(error.data.error[0]);
      } else if (error?.status === 401) {
        setLoginError("E-mail e/ou senha incorreto(s)!");
      } else {
        setLoginError("Falha no login!");
      }
    }
  };

  const handleRegister = async () => {
    if (registerInfo.password !== registerInfo.confirmPassword) {
      setRegisterError("As senhas devem ser iguais!");
      return;
    }

    try {
      await register(registerInfo).unwrap(); // Somente captura erros se usar unwrap
      setRegisterInfo({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsLogin(true);
    } catch (err) {
      const error = err as ErrorType; // Necessário criar uma interface para lidar com o erro
      setRegisterError(error.data.error[0]);
    }
  };

  const changeToLogin = () => {
    setIsLogin(true);
    setRegisterInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setRegisterError("");
  };

  const changeToRegister = () => {
    setIsLogin(false);
    setLoginInfo({
      email: "",
      password: "",
    });
    setLoginError("");
  };

  const mobile = (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.column}>
          <Logo />
        </div>

        {isLogin === null || isLogin ? (
          <div className={styles.login}>
            <div className={styles.infos}>
              <p className={styles.errorMessage}>{loginError}</p>
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
              <p className={styles.move} onClick={() => changeToRegister()}>
                Não possui uma conta?
              </p>
              <button className={styles.button} onClick={() => handleLogin()}>
                ENTRAR
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.register}>
            <div className={styles.infos}>
              <p className={styles.errorMessage}>{registerError}</p>
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
              <p className={styles.move} onClick={() => changeToLogin()}>
                Já possui uma conta?
              </p>
              <button
                className={styles.button}
                onClick={() => handleRegister()}
              >
                REGISTRAR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const desktop = (
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
          {isLogin || isLogin === null ? (
            <p>CONECTE-SE COM OS SEUS AMIGOS!</p>
          ) : (
            <p>REGISTRE-SE AGORA E COMEÇE A CONVERSAR!</p>
          )}
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>
        <div className={styles.login}>
          <div className={styles.infos}>
            <p className={styles.errorMessage}>{loginError}</p>
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
            <p className={styles.move} onClick={() => changeToRegister()}>
              Não possui uma conta?
            </p>
            <button className={styles.button} onClick={() => handleLogin()}>
              ENTRAR
            </button>
          </div>
        </div>
        <div className={styles.register}>
          <div className={styles.infos}>
            <p className={styles.errorMessage}>{registerError}</p>
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
            <p className={styles.move} onClick={() => changeToLogin()}>
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

  return windowSize < 900 ? mobile : desktop;
}

export default Login;
