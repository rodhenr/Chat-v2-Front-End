import { Routes, Route } from "react-router-dom";
import HasToken from "./layout/HasToken";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HasToken />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="register" element={<Register />} />
    </Routes>
  );
}

export default App;
