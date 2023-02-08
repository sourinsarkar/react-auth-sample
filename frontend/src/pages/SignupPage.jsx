import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Signup from "../components/Signup/Signup";
import useToken from "../hooks/auth/useToken";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(0, 0, 0, 0.4);
  width: 100%;
  z-index: 10;
  height: 100vh;
`;

const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border-top: 8px solid #3498db;
  width: 2rem;
  height: 2rem;
  z-index: 11;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SignupPage = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    if (password !== passwordConfirm) {
      return setError("Passwords do not match.");
    }
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios
        .post("https://app-react-authentication.herokuapp.com/api/signup", {
          email,
          password,
          createdAt: new Date(),
        })
        .then((res) => {
          setToken(res.data.token);
          window.location.reload(false);
          navigate("/");
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  // Watches the Error state and handles if there is no error
  useEffect(() => {
    if (password.length > 3) {
      return setError("");
    }
    if (password === passwordConfirm) {
      return setError("");
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <Signup
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        handleSignup={handleSignup}
        error={error}
        setEmail={(email) => setEmail(email)}
        setPassword={(password) => setPassword(password)}
        setPasswordConfirm={(password) => setPasswordConfirm(password)}
      />
      {isLoading && (
        <>
          <Modal />
          <Loader />
        </>
      )}
    </>
  );
};

export default SignupPage;
