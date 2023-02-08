import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  color: #fff;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Input = styled.input`
  outline: none;
  padding: 6px;
  min-width: 16rem;
  border: 1px solid lightgray;
  width: 100%;
  background: rgb(255, 255, 255, 0.2);
  ::placeholder {
    color: #fff;
  }
`;

const Button = styled.button`
  outline: none;
  background-color: transparent;
  transition: all ease 0.1s;
  border: 1px solid lightgray;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  background-color: #fff;
  color: black;
  border-radius: 2rem;
  margin: 10px 0;
  width: 8rem;
  height: 2rem;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
  }
`;

const ForgotPasswordPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    try {
      setIsLoading(true);
      await axios
        .put(
          `https://app-react-authentication.herokuapp.com/api/forgot-password/${email}`
        )
        .then((res) => {
          setSuccess(true);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong.");
      console.log(err);
    }
  };

  return success ? (
    <Container>
      <h1>Success</h1>
      <p>Check your email for a reset link.</p>
    </Container>
  ) : (
    <Container>
      <h1>Forgot your password?</h1>
      <p>Enter your email and we'll send you a reset link</p>
      {error && <Error error={error} />}
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
      />
      <Button onClick={handleSendEmail}>Send</Button>
    </Container>
  );
};

export default ForgotPasswordPage;
