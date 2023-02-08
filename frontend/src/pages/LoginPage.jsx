import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "../hooks/auth/useToken";
import Error from "../components/Error";
import Login from "../components/Login/Login";
import { useQueryParams } from "../utils/useQueryParams";
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

const LoginPage = () => {
  const [, setToken] = useToken();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token: oauthToken } = useQueryParams();
  const [googleOAuthUrl, setGoogleOAuthUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    if (password.length < 3) {
      return setError("Password must be at least 3 characters.");
    }
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .post("https://app-react-authentication.herokuapp.com/api/login", {
          email,
          password,
          signedIn: new Date(),
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

  // This Url is for make user ready to use google authentication
  useEffect(() => {
    const loadOAuthUrl = async () => {
      try {
        const response = await axios.get(
          "https://app-react-authentication.herokuapp.com/auth/google/url"
        );
        const { url } = response.data;
        setGoogleOAuthUrl(url);
      } catch (err) {
        console.log(err);
      }
    };
    loadOAuthUrl();
  }, []);

  // If there is token then allow user to access the website
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      navigate("/");
    }
  }, [oauthToken, setToken, navigate]);

  // Watches the Error state and handles if there is no error
  useEffect(() => {
    if (password.length > 3) {
      return setError("");
    }
  }, [password]);

  return (
    <>
      <Login
        email={email}
        setEmail={(email) => setEmail(email)}
        password={password}
        handleLogin={handleLogin}
        googleOAuthUrl={googleOAuthUrl}
        setPassword={(password) => setPassword(password)}
      />
      {error && <Error error={error} />}
      {isLoading && (
        <>
          <Modal />
          <Loader />
        </>
      )}
    </>
  );
};

export default LoginPage;
