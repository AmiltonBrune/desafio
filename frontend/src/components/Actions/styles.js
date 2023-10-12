import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  

  > svg {
    cursor: pointer;

    transition: opacity 0.3s linear;

    &:hover {
      opacity: 0.7;
    }

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;
