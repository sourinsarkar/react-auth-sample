import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Error from "../../components/Error";

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

const Signin = styled.span`
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

const Helper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-weight: 500;
`;

const Header = styled.h1`
  text-align: center;
  width: 100%;
  color: #fff;
`;

const SignupButton = styled.button`
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

const Signup = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>Sign Up</Header>
      <Helper>
        Already have an account?
        <Signin onClick={() => navigate("/login")}>Login</Signin>
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
      </Box>
      <Box>
        <Label for="passwordConfirm">Password Confirm</Label>
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Enter your password"
          value={props.passwordConfirm}
          onChange={(e) => props.setPasswordConfirm(e.target.value.trim())}
        />
      </Box>
      {props.error && <Error error={props.error} />}
      <SignupButton onClick={props.handleSignup}>Sign Up</SignupButton>
    </Container>
  );
};

export default React.memo(Signup);
