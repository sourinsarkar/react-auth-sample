import React from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordFail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Fail</h1>
      <p>Something went wrong.</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default ResetPasswordFail;
