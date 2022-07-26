import { useState } from "react";

function RegisterInputs() {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <input
        name="firstName"
        onChange={handleInput}
        placeholder="Nome"
        type="text"
        value={registerInfo.firstName}
      />
      <input
        name="lastName"
        onChange={handleInput}
        placeholder="Sobrenome"
        type="text"
        value={registerInfo.lastName}
      />
      <input
        name="email"
        onChange={handleInput}
        placeholder="E-mail"
        type="email"
        value={registerInfo.email}
      />
      <input
        name="password"
        onChange={handleInput}
        placeholder="Senha"
        type="password"
        value={registerInfo.password}
      />
      <input
        name="confirmPassword"
        onChange={handleInput}
        placeholder="Repita a senha"
        type="password"
        value={registerInfo.confirmPassword}
      />
    </>
  );
}

export default RegisterInputs;
