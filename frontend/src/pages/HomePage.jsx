import React from "react";
import styled from "styled-components";
import useUser from "../hooks/auth/useUser";
import locked from "../assets/image/locked.svg";
import unlocked from "../assets/image/unlocked.svg";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
`;

const Background = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 36rem;
  opacity: 0.05;
`;

const HomePage = () => {
  const user = useUser();

  return (
    <Container>
      {user ? (
        <Background src={unlocked} alt="Unlocked" />
      ) : (
        <Background src={locked} alt="Locked" />
      )}
    </Container>
  );
};

export default HomePage;
