import { Routes, Route } from "react-router-dom";
import Auth from "./layout/Auth";
import Chat from "./Chat";
import HasToken from "./layout/HasToken";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<HasToken />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<Auth />}>
          <Route path="chat" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

