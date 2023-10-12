import React from 'react';

import Alert from 'components/Alert';

import { useModal, useItems } from 'hooks';

import { Container } from './styles';

function DeleteItem() {
  const {
    isShowingAlertSucessDelete,
    toggleAlertSucessDelete,
    isShowingAlertWarning,
    toggleAlertWarning,
  } = useModal();

  const { removeItem } = useItems();

  const handleSubmit = () => {
    removeItem()
      .then(() => {
        toggleAlertWarning();
        toggleAlertSucessDelete();
      })
      .catch(() => {
        toggleAlertWarning();
      });
  };

  return (
    <Container>
      <Alert
        isShowingAlert={isShowingAlertWarning}
        msg='Tem certeza que deseja excluir esse item?'
        typeAlert='warning'
        btns={[
          {
            textButton: 'não',
            color: '#fff',
            bgColor: '#EC3535',
            toggleAlert: () => toggleAlertWarning(),
          },
          {
            textButton: 'sim',
            color: '#fff',
            toggleAlert: () => handleSubmit(),
          },
        ]}
      />
      <Alert
        isShowingAlert={isShowingAlertSucessDelete}
        toggleAlert={toggleAlertSucessDelete}
        textButton='ok'
        color='#fff'
        msg='Item excluído com sucesso.'
      />
    </Container>
  );
}

export default DeleteItem;
