import styled from "styled-components";
import theme from "@/styles/theme";

export const Footer = styled.footer`
    width: 100%;
    padding: 2rem 0;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    width: 90%;
`;

export const FooterColumn = styled.div`
    text-align: left;
    margin: 1rem;
`;
export const DashedLine = styled.div`
    border-top: 0.1em solid ${theme.colors.dash};;
    width: 80%;
`;
export const FooterList = styled.ul`
    list-style: none;
    padding: 0;
`;
export const FooterListTitle = styled.h4`
    color: ${theme.colors.infoText};
`;
export const FooterListItem = styled.li`
    margin: 0.5rem 0;
    color: ${theme.colors.infoText};
`;

export const Copyright = styled.p`
    margin-top: 2rem;
    color: ${theme.colors.placeholder};
    font-weight: bold;
`;

export const IconLink = styled.a`
    @media (max-width: 768px) {
        display: none;
    }
`;

export const LogoFooterIcon = styled.img`
    position: absolute;
    width: 3rem;
    height: 3rem;
    left: 5rem;
`;

export const SocialIcons = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
`;

export const SocialIcon = styled.img`
    width: 24px;
    height: 24px;
`;
