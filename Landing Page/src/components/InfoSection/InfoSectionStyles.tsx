import styled from "styled-components";
import theme from "@/styles/theme";

export const InfoSectionContainer = styled.section`
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const InfoSectionTitle = styled.h2`
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${theme.colors.infoText};
    font-weight: bold;
`;

export const HelpSection = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    flex-direction: column;
    align-content: center;
    align-items: center;
    max-width: 50em;
    padding: 0 1.5rem;
`;

export const HelpItemBased = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-image: url(/assets/svg/01.svg);
    background-size: 40%;
    background-position: center;
    background-repeat: no-repeat;
`;

export const HelpItem = styled(HelpItemBased)`
    background-image: url(/assets/svg/01.svg);
    @media (max-width: 545px) {
        flex-direction: column-reverse;
    }
`;

export const HelpItemReversedContent = styled(HelpItemBased)`
    background-image: url(/assets/svg/02.svg);
    padding-top: 5rem;
    @media (max-width: 545px) {
        flex-direction: column;
    }
`;

export const HelpTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 40%;
    @media (max-width: 545px) {
        width: 65%;
    }
`;

export const HelpTextReversedWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 40%;
    @media (max-width: 545px) {
        width: 65%;
    }
`;

export const HelpTitlePlaceholder = styled.h3`
    font-size: 0.8rem;
    color: ${theme.colors.placeholder};
    font-weight: bold;
    margin-bottom: -1em;
`;

export const HelpTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${theme.colors.infoText};
    font-weight: bold;
`;

export const HelpDescription = styled.p`
    font-size: 1rem;
    margin-bottom: 1rem;
    color: ${theme.colors.infoText};
    line-height: 1.6;
`;

export const ProfileImage = styled.img`
    width: 100%;
    max-width: 300px;
    margin-bottom: 1rem;
`;
