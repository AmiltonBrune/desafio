import React from 'react';

import { Button } from 'components/Button';
import Modal from 'components/Modal';
import { Input } from 'components/Input';
import Alert from 'components/Alert';

import { useModal, useItems } from 'hooks';

import { Container, ButtonContainer, Content, InputContainer } from './styles';

function CreateItem() {
  const { selectedItemObject, setSelectedItemObject, update } = useItems();

  const {
    isShowingEdit,
    toggleEdit,
    isShowingAlertSucessEdit,
    toggleAlertSucessEdit,
  } = useModal();

  const handleChange = (e) => {
    setSelectedItemObject({
      ...selectedItemObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    update()
      .then(() => {
        toggleEdit();
        toggleAlertSucessEdit();
      })
      .catch(() => {
        toggleEdit();
        toggleAlertSucessEdit();
      });
  };
  return (
    <Container>
      <Modal
        isShowing={isShowingEdit}
        hide={toggleEdit}
        title='Editar item'
        isCloseButton={true}
        height='350px'
        footer={
          <>
            <Button onClick={toggleEdit} color='#fff' bgColor='#EC3535'>
              fechar
            </Button>
            <Button onClick={handleSubmit} color='#fff'>
              atualizar
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
                value={selectedItemObject.name}
                name='name'
                onChange={handleChange}
              />
            </ButtonContainer>
            <ButtonContainer>
              <Input
                label='Descrição'
                type='text'
                placeholder='Digite a descrição...'
                value={selectedItemObject.description}
                name='description'
                onChange={handleChange}
              />
            </ButtonContainer>
          </InputContainer>
        </Content>
      </Modal>
      <Alert
        isShowingAlert={isShowingAlertSucessEdit}
        toggleAlert={toggleAlertSucessEdit}
        textButton='ok'
        color='#fff'
        msg='Item atualizado com sucesso.'
      />
    </Container>
  );
}

export default CreateItem;
