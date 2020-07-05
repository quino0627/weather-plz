import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
 ${reset}; 
    * {
        box-sizing: border-box;
        
    }
    body {
        font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        min-width:950px;
    }
    a {
        text-decoration:none;
    }

    button,input:focus{
        outline:none;
    }

`;

export default GlobalStyles;
