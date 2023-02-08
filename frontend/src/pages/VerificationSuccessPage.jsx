import React from "react";
import { useNavigate } from "react-router-dom";

const VerificationSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Success</h1>
      <p>Thanks for verifying your email, now you can access the website.</p>
      <button onClick={() => navigate("/")}>Go to home page</button>
    </div>
  );
};

export default VerificationSuccessPage;
