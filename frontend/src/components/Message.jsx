import React from "react";
import styled from "styled-components";

const Container = styled.h2`
  color: lightgreen;
  text-align: center;
`;

const Message = ({ msg }) => {
  return <Container>{msg}</Container>;
};

export default Message;
