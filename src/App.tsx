import { Routes, Route } from "react-router-dom";

import HasToken from "./layout/HasToken";
import Auth from "./layout/Auth";

import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Chatting from "./components/Chat/ChatPage";

function App() {
  return (
    <div>
      <Chatting />
    </div>
  );
}

export default App;

/*function App() {
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

*/
