import { useTranslation } from "react-i18next";
import React, { FunctionComponent, ReactElement } from "react";
import ListItems from "@/components/Footer/ListItems";
import {
	FooterContent, Footer, FooterColumn, IconLink, LogoFooterIcon, FooterListTitle, DashedLine, Copyright, SocialIcons,
	SocialIcon,
} from "@/components/Footer/FooterStyles";

const FooterSection: FunctionComponent = (): ReactElement => {
	const { t } = useTranslation();
	const products: string[] = [t("footer.popular"), t("footer.trending"), t("footer.guided"), t("footer.productsList")];
	const company: string[] = [t("footer.press"), t("footer.mission"), t("footer.strategy"), t("footer.about")];
	const info: string[] = [t("footer.support"), t("footer.customerService"), t("footer.getStarted")];

	return (
		<Footer>
			<FooterContent>
				<IconLink href="https://facebook.com" aria-label="Facebook">
					<LogoFooterIcon src="/assets/svg/header-symbol.svg" alt="Facebook"/>
				</IconLink>

				<ListItems items={products} title={t("footer.products")}/>
				<ListItems items={company} title={t("footer.company")}/>
				<ListItems items={info} title={t("footer.info")}/>

				<FooterColumn>
					<FooterListTitle>{t("footer.followUs")}</FooterListTitle>
					<SocialIcons>
						<a href="https://facebook.com" aria-label="Facebook">
							<SocialIcon src="/assets/svg/facebook.svg" alt="Facebook"/>
						</a>
						<a href="https://twitter.com" aria-label="Twitter">
							<SocialIcon src="/assets/svg/twitter.svg" alt="Twitter"/>
						</a>
						<a href="https://google.com" aria-label="Google">
							<SocialIcon src="/assets/svg/google.svg" alt="Google"/>
						</a>
					</SocialIcons>
				</FooterColumn>
			</FooterContent>
			<DashedLine/>
			<Copyright>{t("footer.copyright")}</Copyright>
		</Footer>);
};

export default FooterSection;
