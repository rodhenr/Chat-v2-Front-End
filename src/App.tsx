import { Routes, Route } from "react-router-dom";

import HasToken from "./layout/HasToken";
import Auth from "./layout/Auth";

import ChatHome from "./pages/ChatHome";
import HomeAuth from "./pages/HomeAuth";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route element={<HasToken />}>
          <Route index element={<HomeAuth />} />
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
