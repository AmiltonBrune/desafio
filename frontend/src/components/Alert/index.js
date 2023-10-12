import React from 'react';

import { Button } from 'components/Button';
import Modal from 'components/Modal';

import success from 'assets/svgs/success.svg';
import error from 'assets/svgs/error.svg';
import warning from 'assets/svgs/warning.svg';

import { Container } from './styles';

function Alert({
  isShowingAlert,
  toggleAlert,
  msg,
  bgColor,
  textButton,
  color,
  typeAlert,
  btnWidth,
  btns = [],
}) {
  const selectImageByTypeAlert = (type) => {
    const types = {
      success: {
        img: success,
        type: 'sucess',
      },
      error: {
        img: error,
        type: 'error',
      },
      warning: {
        img: warning,
        type: 'warning',
      },
    };

    return types[type] ? types[type] : types['success'];
  };

  const { img, type } = selectImageByTypeAlert(typeAlert);

  return (
    <Modal
      isShowing={isShowingAlert}
      hide={toggleAlert}
      isCloseButton={false}
      width='500px'
      height='500px'
      btnWidth={btnWidth}
      justifyContent='center'
      footer={
        <>
          {type === 'warning' ? (
            <>
              {btns.map((btn) => (
                <Button
                  bgColor={btn.bgColor}
                  color={btn.color}
                  onClick={() => btn.toggleAlert()}
                >
                  {btn.textButton}
                </Button>
              ))}
            </>
          ) : (
            <Button onClick={toggleAlert} bgColor={bgColor} color={color}>
              {textButton}
            </Button>
          )}
        </>
      }
    >
      <Container textAlign={type === 'warning' ? 'center' : 'start'}>
        <img src={img} alt='' />
        <p>{msg}</p>
      </Container>
    </Modal>
  );
}

export default Alert;
