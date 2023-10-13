import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useModal, useAuth } from 'hooks';
import Loading from 'components/Loading';

import { Container, ContentBackgroud, TextContainer } from './styles';
import confirmation_backgroud_image from 'assets/svgs/confirmation.svg';
import access_denied from 'assets/svgs/access_denied.svg';

function ActivateAccount() {
  const { isShowingLoading, toggleLoading } = useModal();
  const { code } = useParams();
  const { confirmationRegisterUser, isVerify } = useAuth();

  async function confirmationRegister() {
    await confirmationRegisterUser({ code });
  }

  useEffect(() => {
    confirmationRegister();
  }, []);

  return (
    <Container>
      <ContentBackgroud>
        <p>{isVerify}</p>
        {isVerify ? (
          <>
            <TextContainer>
              <span>Seu cadaastro foi confirmado com sucesso!</span>
            </TextContainer>
            <img
              src={confirmation_backgroud_image}
              alt='confirmation_backgroud_image'
            />
          </>
        ) : (
          <>
            <TextContainer>
              <span>Email já verificado ou link expirado!</span>
            </TextContainer>
            <img src={access_denied} alt='access_denied' />
          </>
        )}
      </ContentBackgroud>
      <Loading
        isShowingLoading={isShowingLoading}
        toggleLoading={toggleLoading}
      />
    </Container>
  );
}

export default ActivateAccount;
