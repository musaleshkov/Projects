import styled from "styled-components";
import theme from "@/styles/theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
`;

export const PrimaryButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primaryDarkRed};
    color: ${theme.colors.whiteText};
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.313rem;
    cursor: pointer;
    font-size: 0.8rem;
    transition: background-color 0.3s ease;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-weight: bold;
`;
