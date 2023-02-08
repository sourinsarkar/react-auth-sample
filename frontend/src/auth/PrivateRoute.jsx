import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/auth/useUser";

const PrivateRoute = () => {
  const user = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
