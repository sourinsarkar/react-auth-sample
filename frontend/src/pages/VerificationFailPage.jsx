import React from "react";
import { useNavigate } from "react-router-dom";

const VerificationSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Failed</h1>
      <p>Something went wrong while trying to verify your email.</p>
      <button onClick={() => navigate("/signup")}>Go to home page</button>
    </div>
  );
};

export default VerificationSuccessPage;
