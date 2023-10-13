import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100vh;
  overflow: none;
`;

export const Tille = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

export const Content = styled.div`
  background: #fff;
  width: 70%;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  padding: 50px;

  gap: 40px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContentBackgroud = styled.div`
  background: linear-gradient(
    to right,
    rgb(231, 76, 60),
    rgb(192, 57, 43),
    rgb(183, 28, 28)
  );
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;

  border: none;

  > img {
    width: 80%;
    height: 80%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 40px;
`;
