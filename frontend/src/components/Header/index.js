import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import { getRouteName } from 'utils';

import { Button } from 'components/Button';

import { useModal } from 'hooks';

import { Container, TitleContainer, Title, ButtonContainer } from './styles';

const MainHeader = () => {
  const [title, setTitle] = useState('');
  const [button, setButton] = useState('');
  const routeName = useLocation();
  const { toggle } = useModal();

  const handleBack = () => {
    if (routeName.pathname !== '/') {
      window.history.back();
    }
  };

  const dictionaryButton = (route) => {
    const dictionary = {
      '/': {
        name: 'novo item',
        isView: true,
        onclick: () => {
          toggle();
        },
      },
    };

    return dictionary[route] ? dictionary[route] : dictionary['/'];
  };

  useEffect(() => {
    setTitle(getRouteName(routeName.pathname));
    setButton(dictionaryButton(routeName.pathname));
    // eslint-disable-next-line
  }, [routeName]);

  return (
    <Container>
      <TitleContainer onClick={handleBack}>
        {routeName.pathname !== '/' && (
          <MdKeyboardArrowLeft size={30} color='#000' />
        )}

        <Title>{title}</Title>
      </TitleContainer>
      <ButtonContainer>
        {button.isView && (
          <Button color='#fff' onClick={button.onclick}>
            {button.name}
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default MainHeader;
