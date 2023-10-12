import { useModal } from 'hooks/modal';
import React from 'react';

import { Container, Icon } from './styles';

export const Input = ({ label, icon, ...rest }) => {
  const { isShowingLoading } = useModal();
  return (
    <Container icon={icon}>
      {!isShowingLoading && <> {label && <label>{label}</label>}</>}
      {icon && (
        <Icon>
          <img src={icon} alt='' width={20} height={20} />
        </Icon>
      )}
      <input {...rest} />
    </Container>
  );
};
