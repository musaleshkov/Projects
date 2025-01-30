import { createGlobalStyle } from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'TT', sans-serif;
        background-color: ${theme.colors.background};
        color: ${theme.colors.text};
    }

    *:focus {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 2px;
    }

    @media (max-width: 768px) {
        body {
            font-size: 14px;
        }
    }
`;

export default GlobalStyles;
