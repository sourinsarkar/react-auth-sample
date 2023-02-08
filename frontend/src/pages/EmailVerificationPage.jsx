import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/auth/useToken";
import VerificationFailPage from "./VerificationFailPage";
import VerificationSuccessPage from "./VerificationSuccessPage";

const EmailVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const { verificationToken } = useParams();
  const [, setToken] = useToken();

  useEffect(() => {
    const loadedVerification = async () => {
      try {
        await axios
          .put("https://app-react-authentication.herokuapp.com/api/verify", {
            verificationToken,
          })
          .then((res) => {
            setToken(res.data.token);
            setIsSuccess(true);
            setIsLoading(false);
          });
      } catch (err) {
        console.log(err);
      }
    };
    loadedVerification();
  }, [setToken, verificationToken]);

  if (isLoading) return <p>Loading...</p>;
  if (!isSuccess) return <VerificationFailPage />;

  return <VerificationSuccessPage />;
};

export default EmailVerificationPage;
