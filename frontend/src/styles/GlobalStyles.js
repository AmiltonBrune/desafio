import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0
   }

   html, body, #root{
      height: 100%;
      overflow-x: hidden;
   }

   *, button, input {
      border: 0;
      outline: 0;
      font-family: 'Poppins', sans-serif;
   }

   button {
      cursor: pointer;
   }

   .react-select__control {
      border-radius: 50px;
   }
`;
