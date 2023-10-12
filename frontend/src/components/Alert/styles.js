import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  height: 70%;

  > p {
    font-size: 24px;
    text-align: ${(props) => props.textAlign};
  }
`;
