import React, { useState } from 'react';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import { Input } from 'components/Input';
import Alert from 'components/Alert';

import { useModal, useItems } from 'hooks';

import { Container, ButtonContainer, Content, InputContainer } from './styles';

function CreateItem() {
  const [values, setVaues] = useState({});
  const {
    isShowing,
    toggle,
    isShowingAlertSucess,
    toggleAlertSucess,
    isShowingAlertError,
    toggleAlertError,
  } = useModal();

  const { create } = useItems();

  const handleChange = (e) => {
    setVaues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    create(values)
      .then(() => {
        toggle();
        toggleAlertSucess();
      })
      .catch(() => {
        toggle();
        toggleAlertError();
      });
  };

  return (
    <Container>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title='Cadastrar item'
        isCloseButton={true}
        height='350px'
        footer={
          <>
            <Button onClick={toggle} color='#fff' bgColor='#EC3535'>
              fechar
            </Button>
            <Button onClick={handleSubmit} color='#fff'>
              cadastrar
            </Button>
          </>
        }
      >
        <Content>
          <InputContainer>
            <ButtonContainer>
              <Input
                label='Nome'
                type='text'
                placeholder='Digite o nome...'
                name='name'
                onChange={(e) => handleChange(e)}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Input
                label='Descriçã'
                type='text'
                placeholder='Digite a descrição...'
                name='description'
                onChange={(e) => handleChange(e)}
              />
            </ButtonContainer>
          </InputContainer>
        </Content>
      </Modal>
      <Alert
        isShowingAlert={isShowingAlertSucess}
        toggleAlert={toggleAlertSucess}
        textButton='ok'
        color='#fff'
        msg='Item adicionado com sucesso.'
      />
      <Alert
        isShowingAlert={isShowingAlertError}
        toggleAlert={handleSubmit}
        typeAlert='error'
        textButton='tentar novamente'
        color='#fff'
        btnWidth='200px'
        bgColor='#EC3535'
        msg='Erro ao cadastrar novo item.'
      />
    </Container>
  );
}

export default CreateItem;
