import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin_privateRoute = () => {
  const { userInfo } = useSelector((state) => state.login);

  // if able to obtain userInfo, navigate to outlet, if not go to login page
  return userInfo && userInfo.adminRights ?
    <Outlet /> : <Navigate to="/login" replace />;
};

export default Admin_privateRoute;
