import React from 'react';
import { createPortal } from 'react-dom';
import Lottie from 'lottie-react';

import { Backgroud, Container } from './styles';

import loadingAnimation from 'assets/animations/loading.json';

const Loading = ({ isShowingLoading }) =>
  isShowingLoading
    ? createPortal(
        <>
          <Backgroud />
          <Container>
            <Lottie animationData={loadingAnimation} loop={true} />
          </Container>
        </>,
        document.body
      )
    : null;

export default Loading;
