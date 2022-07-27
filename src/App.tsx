import { Routes, Route } from "react-router-dom";
import Auth from "./layout/Auth";
import Chat from "./pages/Chat";
import HasToken from "./layout/HasToken";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div>
      <Chat />
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
