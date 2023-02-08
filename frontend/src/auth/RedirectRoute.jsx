import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/auth/useUser";

const RedirectRoute = () => {
  const user = useUser();
  if (user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default RedirectRoute;
