import { setData, setError } from "../features/auth/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

function RegisterInputs() {
  const data = useSelector((state: RootState) => state.register.data);
  const error = useSelector((state: RootState) => state.register.errMsg);
  const dispatch = useDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (error) {
      dispatch(setError(""));
    }

    dispatch(setData({ ...data, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <input
        minLength={3}
        name="firstName"
        onChange={handleInput}
        placeholder="Nome"
        type="text"
        value={data.firstName}
      />
      <input
        minLength={3}
        name="lastName"
        onChange={handleInput}
        placeholder="Sobrenome"
        type="text"
        value={data.lastName}
      />
      <input
        name="email"
        onChange={handleInput}
        placeholder="E-mail"
        type="email"
        value={data.email}
      />
      <input
        minLength={6}
        name="password"
        onChange={handleInput}
        placeholder="Senha"
        type="password"
        value={data.password}
      />
      <input
        minLength={6}
        name="confirmPassword"
        onChange={handleInput}
        placeholder="Repita a senha"
        type="password"
        value={data.confirmPassword}
      />
    </>
  );
}

export default RegisterInputs;
