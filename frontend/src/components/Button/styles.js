import styled from 'styled-components';

export const Container = styled.button`
  width: 100%;
  height: 50px;

  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;

  background: ${(props) =>
    props.bgColor
      ? props.bgColor
      : `linear-gradient(to right,${props.theme.colors.gradient})`};

  border-radius: 50px;
  padding: 10px;

  transition: opacity 0.3s linear;

  border: ${(props) => (props.isBorder ? '2px solid transparent' : 'none')};

  > span {
    background: ${(props) =>
      props.color
        ? props.color
        : `linear-gradient(to right, ${props.theme.colors.gradient})`};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    opacity: 0.7;
  }
`;
