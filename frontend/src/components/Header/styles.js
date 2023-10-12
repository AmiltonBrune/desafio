import styled from 'styled-components';

export const Container = styled.div`
  grid-area: MH;
  color: white;
  background-color: ${(props) => props.theme.colors.white};

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const Title = styled.span`
  color: ${(props) => props.theme.colors.black};
`;

export const TitleContainer = styled.div`
  display: flex;
  padding-left: 40px;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;

  > svg {
    font-size: 20px;
    margin-right: 5px;
    color: ${(props) => props.theme.colors.black};
    font-weight: 400;
  }
`;

export const ButtonContainer = styled.div`
  padding-right: 50px;

  > button {
    font-size: 14px;
    width: 200px;
    height: 50px;
    padding: 10px;
  }
`;
