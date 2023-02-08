import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ResetPasswordFail from "./ResetPasswordFail";
import ResetPasswordSuccess from "./ResetPasswordSuccess";
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

const Label = styled.label`
  color: #fff;
  font-weight: 500;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  margin: 0 auto;
`;

const Input = styled.input`
  outline: none;
  padding: 6px;
  min-width: 16rem;
  border: 1px solid lightgray;
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

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const { passwordResetToken } = useParams();

  const handleResetPassword = async () => {
    try {
      await axios.put(
        `https://app-react-authentication.herokuapp.com/api/users/reset-password/${passwordResetToken}`,
        {
          password,
        }
      );
      setIsSuccess(true);
    } catch (err) {
      console.log(err);
      setIsFailure(false);
    }
  };

  if (isFailure) return <ResetPasswordFail />;
  if (isSuccess) return <ResetPasswordSuccess />;

  return (
    <Container>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>
      <Box>
        <Label for="password">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          placholder="Password"
        />
      </Box>
      <Box>
        <Label for="password">Password Confirm</Label>
        <Input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value.trim())}
          placholder="Password Confirm"
        />
      </Box>
      <Button onClick={handleResetPassword}>Send</Button>
    </Container>
  );
};

export default ResetPasswordPage;
