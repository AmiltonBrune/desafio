import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  width: 100%;
  padding: 5px;

  color: ${(props) => props.theme.colors.black};
`;
