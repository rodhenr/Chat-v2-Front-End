import { loginData, loginError } from "../features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

function LoginInputs() {
  const data = useSelector((state: RootState) => state.login.login);
  const error = useSelector((state: RootState) => state.login.errorMsg);
  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (error) {
      dispatch(loginError(""));
    }

    dispatch(loginData({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <input
        name="email"
        onChange={handleInput}
        placeholder="E-mail"
        type="email"
        value={data.email}
      />
      <input
        name="password"
        onChange={handleInput}
        placeholder="Senha"
        type="password"
        value={data.password}
      />
    </>
  );
}

export default LoginInputs;
