import React, { useState } from 'react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';

import { useModal, useAuth } from 'hooks';
import Loading from 'components/Loading';

import {
  Container,
  Content,
  Tille,
  Logo,
  ContentBackgroud,
  LogoContainer,
  Form,
} from './styles';
import logo_image from 'assets/svgs/logo.svg';
import sigin_backgroud_image from 'assets/svgs/sigin_backgroud_image.svg';

function Signin() {
  const [values, setVaues] = useState({});

  const { isShowingLoading, toggleLoading } = useModal();
  const { signIn } = useAuth();

  const handleChange = (e) => {
    setVaues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    toggleLoading();
    await signIn(values.email, values.password);
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo src={logo_image} alt='logo' />
        </LogoContainer>
        <Tille>Login</Tille>
        <Form>
          <Input
            label='Email'
            type='text'
            placeholder='Digite seu email...'
            name='email'
            onChange={handleChange}
          />
          <Input
            label='Senha'
            type='password'
            placeholder='Digite sua senha...'
            name='password'
            onChange={handleChange}
          />

          <Button type='submit' color='#fff' onClick={handleSubmit}>
            entrar
          </Button>
          <Button
            type='submit'
            bgColor='linear-gradient(white, white) padding-box,linear-gradient(to right,rgb(231, 76, 60), rgb(192, 57, 43), rgb(183, 28, 28)) border-box'
            isBorder='true'
          >
            cadastrar
          </Button>
        </Form>
      </Content>
      <ContentBackgroud>
        <img src={sigin_backgroud_image} alt='sigin_backgroud_image' />
      </ContentBackgroud>
      <Loading
        isShowingLoading={isShowingLoading}
        toggleLoading={toggleLoading}
      />
    </Container>
  );
}

export default Signin;
