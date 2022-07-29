import { Routes, Route } from "react-router-dom";

import HasToken from "./layout/HasToken";
import Auth from "./layout/Auth";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatMobile from "./pages/ChatMobile";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<HasToken />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="chat" element={<Auth />}>
          <Route index element={<Chat />} />
          <Route path=":id" element={<ChatMobile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
