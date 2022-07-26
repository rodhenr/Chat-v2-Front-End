import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

function Auth() {
  const location = useLocation();
  const token = useSelector(selectToken);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}

export default Auth;
