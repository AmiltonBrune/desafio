import styled from 'styled-components';

export const Container = styled.input`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: ${(props) => `2px solid ${props.theme.colors.secondary}`};
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: gray;
  }
`;
