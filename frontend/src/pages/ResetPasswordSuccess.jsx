import React from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Success</h1>
      <p>
        Your password has been reset, now please login with your new password.
      </p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default ResetPasswordSuccess;
