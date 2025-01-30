import styled from "styled-components";
import theme from "@/styles/theme";

export const HeroSectionBase = styled.section`
    width: 100%;
    padding: 2rem 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const HeroSectionContainer = styled(HeroSectionBase)`
    background-image: url(/assets/svg/FirstSectionBackground.svg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    padding: 4rem 2rem;
    text-align: center;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (max-width: 768px) {
        padding: 2rem 1rem;
        min-height: 50vh;
        align-items: center;
    }

    @media (max-width: 480px) {
        padding: 1rem 0.5rem;
        min-height: 40vh;
    }
`;

export const HeroSectionWrapper = styled(HeroSectionBase)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding-left: 5rem;
    max-width: 55%;

    @media (max-width: 768px) {
        max-width: 55%;
        margin-right: 42%;
    }

    @media (max-width: 480px) {
        max-width: 74%;
        margin-right: 33%;
    }
`;

export const LogoIcon = styled.img`
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: 5rem;
    top: 2rem;

    @media (max-width: 768px) {
        left: 3rem;
        top: 1rem;
    }

    @media (max-width: 480px) {
        left: 1.6rem;
    }
`;

export const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
    color: ${theme.colors.infoText};
    font-weight: bold;
`;

export const Subtitle = styled.p`
    font-size: 1.25rem;
    margin-bottom: 2rem;
    color: ${theme.colors.infoText};
    max-width: 37.5rem;
    line-height: 1.6;
`;
