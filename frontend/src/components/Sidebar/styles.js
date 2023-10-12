import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.aside`
  grid-area: AS;
  background-color: ${(props) => props.theme.colors.primary};

  position: relative;

  @media (max-width: 768px) {
    padding-left: 20px;
    position: fixed;
    z-index: 2;

    width: 100%;

    height: 100vh;
    overflow: hidden;

    height: ${(props) => (props.menuIsOpen ? '100vh' : '70px')};

    ${(props) =>
      !props.menuIsOpen
        ? css`
            transition: height 0.3s;
            border: none;
          `
        : css`
            transition: height 0.4s;
          `}
  }

  @media (max-width: 280px) {
    padding: 7px;
    position: fixed;
    z-index: 2;

    height: ${(props) => (props.menuIsOpen ? '100vh' : '70px')};
    overflow: hidden;

    ${(props) =>
      !props.menuIsOpen
        ? css`
            transition: height 0.3s;
            border: none;
          `
        : css`
            transition: height 0.4s;
          `}
  }
`;
export const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
`;

export const LogImg = styled.img`
  height: 40px;
  width: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  span {
    color: ${(props) => props.theme.colors.white};
    font-size: 16px;
    font-weight: 500;

    margin-top: 20px;
  }

  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;

    > img {
      width: 100px;
    }
  }
`;

export const ProfileImagem = styled.img`
  width: 72px;
  border-radius: 50px;
`;

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
  padding-left: 50px;

  margin: 70px 0 0 0;

  @media (max-width: 768px) {
    margin: 70px 0 0 50px;
  }

  @media (max-width: 280px) {
    overflow: hidden;
  }
`;

export const MenuItemLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;
  opacity: ${(props) => (props.active ? 1 : 0.5)};

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 20px;
    margin-right: 20px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    > svg {
      font-size: 18px;
      margin-right: 20px;
    }
  }
`;

export const MenuItemButton = styled.button`
  font-size: 20px;
  color: ${(props) => props.theme.colors.white};

  border: 0;
  background: none;

  margin: 7px 0;
  display: flex;
  align-items: center;

  transition: opacity 0.3s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  > svg {
    font-size: 20px;
    margin-right: 15px;
  }

  @media (max-width: 768px) {
    font-size: 18px;
    > svg {
      font-size: 18px;
      margin-right: 15;
    }
  }
`;

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 50px;
  font-size: 22px;

  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.black};

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export const ThemeToggleFooter = styled.footer`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  bottom: 30px;

  @media (max-width: 768px) {
    display: ${(props) => (props.menuIsOpen ? 'flex' : 'none')};
  }

  @media (max-width: 280px) {
    display: ${(props) => (props.menuIsOpen ? 'flex' : 'none')};
  }
`;
