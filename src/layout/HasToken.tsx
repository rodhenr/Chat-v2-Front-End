import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";

function CheckToken() {
  const location = useLocation();
  const token = useSelector(selectToken);

  return token ? (
    <Navigate to="/chat" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default CheckToken;
