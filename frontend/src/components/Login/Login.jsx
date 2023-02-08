import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import google from "../../assets/image/google.svg";

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
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  margin: 0 auto;
`;

const Label = styled.label`
  color: #fff;
  font-weight: 500;
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

const Header = styled.h1`
  text-align: center;
  width: 100%;
  color: #fff;
`;

const GoogleImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Helper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-weight: 500;
`;

const Signup = styled.span`
  background-color: transparent;
  font-size: 14px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
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

const SigninWithGoogle = styled.button`
  background-color: transparent;
  width: 12rem;
  height: 36px;
  border: 1px solid lightgray;
  margin: 0 auto;
  color #fff;
  display: flex;
  align-items:center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;
`;

const ForgotPassword = styled.button`
  margin: 1rem 0 0 0;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  width: 3rem;
  height: 3rem;
  color: #fff;
  margin: 0 auto;
  background-color: rgb(255, 255, 255, 0.1);
`;

const Login = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>Login</Header>
      <Helper>
        Don't have an account?
        <Signup onClick={() => navigate("/signup")}>Sign Up</Signup>
      </Helper>
      <Box>
        <Label for="email">Email</Label>
        <Input
          type="text"
          name="email"
          placeholder="Enter your email"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value.trim())}
        />
      </Box>
      <Box>
        <Label for="password">Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value.trim())}
        />
        <ForgotPassword onClick={() => navigate("/forgot-password")}>
          Forgot your password?
        </ForgotPassword>
      </Box>
      <LoginButton onClick={props.handleLogin}>Login</LoginButton>
      <Grid>OR</Grid>
      <SigninWithGoogle
        disabled={!props.googleOAuthUrl}
        onClick={() => {
          /* Opens a new tab which includes google accounts */
          window.location.href = props.googleOAuthUrl;
        }}
      >
        <GoogleImage src={google} alt="Google" />
        Sign in with Google
      </SigninWithGoogle>
    </Container>
  );
};

export default React.memo(Login);
