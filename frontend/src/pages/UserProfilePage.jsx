import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/auth/useToken";
import useUser from "../hooks/auth/useUser";
import Profile from "../components/UserProfile/Profile";
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

const UserProfilePage = () => {
  const user = useUser();
  const { id, isVerified, info, email } = user;
  const [token, setToken] = useToken();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(info?.firstName || "");
  const [lastName, setLastName] = useState(info?.lastName || "");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveUserInfo = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios
        .put(
          `https://app-react-authentication.herokuapp.com/api/users/${id}`,
          {
            firstName,
            lastName,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setToken(res.data.token);
          setMessage("User infos successfully updated.");
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setMessage("User infos is not updated.");
      console.log(err);
    }
  };

  const handleReset = () => {
    setFirstName(info?.firstName);
    setLastName(info?.lastName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
    navigate("/");
  };

  return (
    <>
      <Profile
        firstName={firstName}
        lastName={lastName}
        email={email}
        handleReset={handleReset}
        isVerified={isVerified}
        handleSaveUserInfo={handleSaveUserInfo}
        handleLogout={handleLogout}
        message={message}
        setIsLoading={(boolean) => setIsLoading(boolean)}
        setFirstName={(firstName) => setFirstName(firstName)}
        setLastName={(lastName) => setLastName(lastName)}
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

export default UserProfilePage;
