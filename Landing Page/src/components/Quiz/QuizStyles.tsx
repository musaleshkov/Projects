import styled from "styled-components";

export const QuizContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    height: 100vh;
`;
export const QuizButton = styled.button`
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.313rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    margin: 1rem 1rem;

    &:hover {
        filter: blur(0.1em) brightness(0.8) contrast(1.2);
    }
`;
