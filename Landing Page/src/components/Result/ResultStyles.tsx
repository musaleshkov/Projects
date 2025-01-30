import styled from "styled-components";

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    height: 100vh;
`;
export const ResultText = styled.h2`
    width: 50%;
`;
export const ResultButtonWrapper = styled.div`
    width: 40em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
