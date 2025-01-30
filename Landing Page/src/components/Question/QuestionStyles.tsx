import styled from "styled-components";

export const QuestionContainer = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    height: 100vh;
    width: 50%;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

export const QuestionButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 1000px) or (max-height: 820px) {
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: unset;
        overflow-y: auto;
    }
`;
