import styled from "styled-components";
import theme from "@/styles/theme";

export const LanguageSwitcherContainer = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    @media (max-width: 768px) {
        right: 1rem;
        top: 1rem;
    }

    @media (max-width: 480px) {
        right: 1.6rem;
    }
`;

export const LanguageButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryDarkRed};
    color: ${theme.colors.whiteText};
    padding: 0.4rem 0.6rem;
    border: none;
    border-radius: 0.313rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
    margin: 0 0.5em;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
`;
