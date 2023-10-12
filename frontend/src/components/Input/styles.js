import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  input {
    border: 2px solid transparent;
    border-radius: 50px;
    position: relative;
    width: 100%;
    height: 50px;
    padding: 0 30px;

    font-size: 16px;

    background: ${(props) => `linear-gradient(white, white) padding-box,
      linear-gradient(to right, ${props.theme.colors.gradient}) border-box`};
    text-indent: ${(props) => (props.icon ? `20px` : '0px')};
  }

  input::placeholder {
    color: ${(props) => props.theme.colors.gray};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${(props) => props.theme.colors.gray};
  }

  ::-ms-input-placeholder {
    color: ${(props) => props.theme.colors.gray};
  }

  label {
    position: absolute;
    top: -10px;
    z-index: 1;
    left: 30px;
    background-color: ${(props) => props.theme.colors.white};
    padding: 0 5px;
    font-size: 14px;
    font-weight: 400;
  }
`;

export const Icon = styled.div`
  height: 20px;
  position: absolute;
  box-sizing: border-box;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;
