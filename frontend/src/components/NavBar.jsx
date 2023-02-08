import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../hooks/auth/useUser";

const Container = styled.nav`
  width: 100%;
  height: 7vh;
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const List = styled.ul`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  padding: 0;
  list-style: none;
  height: 100%;
  border-bottom: 1px solid #fff;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Text = styled.p`
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  padding: 1rem;
  cursor: pointer;
  transition: all ease 0.3s;
  border-radius: 2px;
  &:hover {
    background-color: rgb(255, 255, 255, 0.1);
  }
`;

const NavBar = () => {
  const user = useUser();

  return (
    <Container>
      <List>
        <li>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text>Home</Text>
          </Link>
        </li>
        {user ? (
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <Text>User Profile</Text>
            </Link>
          </li>
        ) : (
          <Box>
            <li>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Text>Login</Text>
              </Link>
            </li>
            <li>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Text>Signup</Text>
              </Link>
            </li>
          </Box>
        )}
      </List>
    </Container>
  );
};

export default NavBar;
