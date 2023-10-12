import React from 'react';
import { createPortal } from 'react-dom';
import { RiCloseCircleLine } from 'react-icons/ri';

import {
  Backgroud,
  Body,
  CloseButton,
  Container,
  Content,
  Footer,
  FooterContainer,
  Header,
  Title,
} from './styles';

const Modal = ({
  children,
  isShowing,
  hide,
  title,
  footer,
  justifyContent,
  width,
  height,
  btnWidth,
  isCloseButton,
}) =>
  isShowing
    ? createPortal(
        <>
          <Backgroud />
          <Container>
            <Content width={width} height={height}>
              <Header>
                <Title>{title}</Title>
              </Header>
              {isCloseButton && (
                <CloseButton onClick={hide}>
                  <RiCloseCircleLine />
                </CloseButton>
              )}

              <Body>{children}</Body>
              <Footer>
                <FooterContainer
                  justifyContent={justifyContent}
                  btnWidth={btnWidth}
                >
                  {footer}
                </FooterContainer>
              </Footer>
            </Content>
          </Container>
        </>,
        document.body
      )
    : null;

export default Modal;
