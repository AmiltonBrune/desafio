import React from 'react';

import Content from 'components/Content';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

import { Container } from './styles';

function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
}

export default Layout;
