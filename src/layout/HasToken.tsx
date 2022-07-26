import { useLocation, Navigate, Outlet } from "react-router-dom";

function CheckToken() {
  const location = useLocation();
  const token = false;

  return token ? (
    <Navigate to="/?" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default CheckToken;
