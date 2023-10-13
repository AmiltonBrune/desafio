import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import register_image from 'assets/svgs/register.svg';

function Signup() {
  const [values, setVaues] = useState({});
  const navigate = useNavigate();

  const { isShowingLoading, toggleLoading } = useModal();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setVaues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    signup(values.email, values.password)
      .then(() => {
        alert('usuário cadastrado com sucesso');
        navigate('/');
      })
      .catch(() => {});
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Logo src={logo_image} alt='logo' />
        </LogoContainer>
        <Tille>Cadastro</Tille>
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
            cadastrar
          </Button>
          <Button
            bgColor='linear-gradient(white, white) padding-box,linear-gradient(to right,rgb(231, 76, 60), rgb(192, 57, 43), rgb(183, 28, 28)) border-box'
            isBorder='true'
            onClick={() => navigate('/')}
          >
            entrar
          </Button>
        </Form>
      </Content>
      <ContentBackgroud>
        <img src={register_image} alt='register_image' />
      </ContentBackgroud>
      <Loading
        isShowingLoading={isShowingLoading}
        toggleLoading={toggleLoading}
      />
    </Container>
  );
}

export default Signup;
