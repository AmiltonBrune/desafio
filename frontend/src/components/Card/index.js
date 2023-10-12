import React from 'react';

import {
  Container,
  ComponentContainer,
  Header,
  TitleContainer,
} from './styles';

function Card({ children, width, title, subTitle, height, component }) {
  return (
    <Container width={width} height={height}>
      <Header>
        <TitleContainer>
          <h3> {title}</h3>
          <p>{subTitle}</p>
        </TitleContainer>
        <ComponentContainer>{component}</ComponentContainer>
      </Header>
      {children}
    </Container>
  );
}

export default Card;
