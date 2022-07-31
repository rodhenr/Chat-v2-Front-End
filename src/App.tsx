import { Routes, Route } from "react-router-dom";

import HasToken from "./layout/HasToken";
import Auth from "./layout/Auth";

import ChatHome from "./pages/ChatHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<HasToken />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="chat" element={<Auth />}>
          <Route index element={<ChatHome />} />
          <Route path=":contactId" element={<Chat />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
