import React from "react";
import styled from "styled-components";

const Container = styled.h4`
  color: #bc4749;
  text-align: center;
`;

const Error = ({ error }) => {
  return <Container>{error}</Container>;
};

export default Error;
