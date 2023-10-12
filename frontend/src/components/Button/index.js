import React from 'react';

import { Container } from './styles';

export const Button = ({ children, ...rest }) => (
  <Container {...rest}>
    <span>{children}</span>
  </Container>
);
