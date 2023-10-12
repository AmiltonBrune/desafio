import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: ${(props) => (props.width ? props.width : '100%')};
  height: ${(props) => (props.height ? props.height : 'auto')};
  padding: 25px;

  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
`;

export const Header = styled.header`
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`;

export const TitleContainer = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14;
    font-weight: 300;
  }
`;

export const ComponentContainer = styled.div``;
