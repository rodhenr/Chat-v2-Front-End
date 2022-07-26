import { useState } from "react";


function LoginInputs() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <input
        name="email"
        onChange={handleInput}
        placeholder="E-mail"
        type="email"
        value={loginInfo.email}
      />
      <input
        name="password"
        onChange={handleInput}
        placeholder="Senha"
        type="password"
        value={loginInfo.password}
      />
    </>
  );
}

export default LoginInputs;
