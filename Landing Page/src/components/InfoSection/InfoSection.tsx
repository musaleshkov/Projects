import { useTranslation } from "react-i18next";
import { FunctionComponent, ReactElement } from "react";
import {
	InfoSectionContainer, InfoSectionTitle, HelpItem, HelpItemReversedContent, HelpSection, HelpTextWrapper,
	HelpTitlePlaceholder, HelpTitle, HelpDescription, HelpTextReversedWrapper, ProfileImage,
} from "@/components/InfoSection/InfoSectionStyles";

const InfoSection: FunctionComponent = (): ReactElement => {
	const { t } = useTranslation();

	return (
		<InfoSectionContainer>
			<InfoSectionTitle>{t("whatWeCanHelpWith")}</InfoSectionTitle>
			<HelpSection>
				<HelpItem>
					<div>
						<ProfileImage src="/assets/svg/SecondSectionProfilePerson.svg" alt="Hair Loss"/>
					</div>
					<HelpTextWrapper>
						<HelpTitlePlaceholder>{t("hairLoss.title")}</HelpTitlePlaceholder>
						<HelpTitle>{t("hairLoss.description1")}</HelpTitle>
						<HelpDescription>{t("hairLoss.description2")}</HelpDescription>
					</HelpTextWrapper>
				</HelpItem>
				<HelpItemReversedContent>
					<HelpTextReversedWrapper>
						<HelpTitlePlaceholder>{t("erectileDysfunction.title")}</HelpTitlePlaceholder>
						<HelpTitle>{t("erectileDysfunction.description1")}</HelpTitle>
						<HelpDescription>{t("erectileDysfunction.description2")}</HelpDescription>
					</HelpTextReversedWrapper>
					<div>
						<ProfileImage src="/assets/svg/ThirdSectionProfilePerson.svg" alt="Erectile Dysfunction"/>
					</div>
				</HelpItemReversedContent>
			</HelpSection>
		</InfoSectionContainer>
	);
};

export default InfoSection;
