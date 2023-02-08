import axios from "axios";
import React from "react";
import styled from "styled-components";
import Message from "../Message";

const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
`;

const LargeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 1rem;
  width: 100%;
`;

const Input = styled.input`
  outline: none;
  padding: 6px;
  border: 1px solid lightgray;
  background: rgb(255, 255, 255, 0.2);
  ::placeholder {
    color: #fff;
  }
`;

const LargeInput = styled.input`
  outline: none;
  padding: 6px;
  border: 1px solid lightgray;
  background: rgb(255, 255, 255, 0.2);
  width: 100%;
  color: black;
  ::placeholder {
    color: #fff;
  }
`;

const Label = styled.label`
  color: #fff;
  font-weight: 500;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

const SaveButton = styled.button`
  outline: none;
  background-color: #4c956c;
  transition: all ease 0.1s;
  border: 1px solid lightgray;
  color: #fff;
  font-weight: 600;
  border-radius: 2rem;
  cursor: pointer;
  width: 8rem;
  height: 2rem;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
      rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  }
`;

const ResetButton = styled.button`
  outline: none;
  background-color: transparent;
  transition: all ease 0.1s;
  border: 1px solid lightgray;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border-radius: 2px;
  width: 8rem;
  height: 2rem;
  &:hover {
    background-color: #dbb42c;
    color: #000814;
  }
`;

const Email = styled.div`
  display: flex;
  width: 100%;
`;

const EmailButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 2rem;
  outline: none;
  background-color: transparent;
  transition: all ease 0.1s;
  border: 1px solid #fff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border-radius: 2px;
`;

const LogoutButton = styled.button`
  outline: none;
  background-color: transparent;
  transition: all ease 0.1s;
  border: 1px solid lightgray;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  border-radius: 2px;
  width: 8rem;
  height: 2rem;
  &:hover {
    background-color: #ef233c;
  }
`;

const Profile = (props) => {
  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      props.setIsLoading(true);
      await axios.post(
        "https://app-react-authentication.herokuapp.com/api/test-email",
        {
          email: props.email,
        }
      );
      props.setIsLoading(false);
    } catch (err) {
      props.setIsLoading(false);
      console.log(err);
    }
  };
  return (
    <Container>
      <lord-icon
        src="https://cdn.lordicon.com/ajkxzzfb.json"
        trigger="hover"
        style={{ width: "250px", height: "250px", margin: "0 auto" }}
      ></lord-icon>
      <Row>
        <Box>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={props.firstName}
            onChange={(e) => props.setFirstName(e.target.value)}
            placeholder="Your First Name"
          />
        </Box>
        <Box>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={props.lastName}
            onChange={(e) => props.setLastName(e.target.value)}
            placeholder="Your Last Name"
          />
        </Box>
      </Row>
      <LargeBox>
        <Label for="lastName">Email</Label>
        <Email>
          <LargeInput
            type="text"
            name="lastName"
            disabled
            value={props.email}
            placeholder="Your Last Name"
          />
          {!props.isVerified && (
            <EmailButton onClick={sendEmail}>Verify</EmailButton>
          )}
        </Email>
        {!props.isVerified && <p>Please verify your email.</p>}
      </LargeBox>
      <Buttons>
        <SaveButton onClick={props.handleSaveUserInfo}>Save</SaveButton>
        <ResetButton onClick={props.handleReset}>Reset</ResetButton>
      </Buttons>
      <LogoutButton onClick={props.handleLogout}>Logout</LogoutButton>
      {props.message && <Message message={props.message} />}
    </Container>
  );
};

export default Profile;
