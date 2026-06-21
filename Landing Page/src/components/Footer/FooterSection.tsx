import { useTranslation } from "react-i18next";
import { type FunctionComponent, type ReactElement } from "react";
import ListItems from "@/components/Footer/ListItems";
import { SOCIAL_LINKS } from "@/constants/footer";

const FooterSection: FunctionComponent = (): ReactElement => {
	const { t } = useTranslation();

	const products: string[] = [
		t("footer.popular"),
		t("footer.trending"),
		t("footer.guided"),
		t("footer.productsList"),
	];
	const company: string[] = [
		t("footer.press"),
		t("footer.mission"),
		t("footer.strategy"),
		t("footer.about"),
	];
	const info: string[] = [
		t("footer.support"),
		t("footer.customerService"),
		t("footer.getStarted"),
	];

	return (
		<footer className="w-full py-8 bg-secondary-50 text-center flex flex-col items-center mt-4">
			<div className="flex justify-around flex-wrap mb-8 w-[90%]">
				<a
					href="https://facebook.com"
					aria-label="Facebook"
					className="hidden md:hidden"
				>
					<img
						src="/assets/svg/header-symbol.svg"
						alt="Facebook"
						className="w-12 h-12"
					/>
				</a>

				<ListItems items={products} title={t("footer.products")} />
				<ListItems items={company} title={t("footer.company")} />
				<ListItems items={info} title={t("footer.info")} />

				<div className="text-left mx-4 my-4">
					<h4 className="text-foreground font-semibold mb-2">
						{t("footer.followUs")}
					</h4>
					<div className="flex justify-center gap-4 mt-4">
						<a href={SOCIAL_LINKS.facebook} aria-label="Facebook">
							<img
								src="/assets/svg/facebook.svg"
								alt="Facebook"
								className="w-6 h-6"
							/>
						</a>
						<a href={SOCIAL_LINKS.twitter} aria-label="Twitter">
							<img
								src="/assets/svg/twitter.svg"
								alt="Twitter"
								className="w-6 h-6"
							/>
						</a>
						<a href={SOCIAL_LINKS.google} aria-label="Google">
							<img
								src="/assets/svg/google.svg"
								alt="Google"
								className="w-6 h-6"
							/>
						</a>
					</div>
				</div>
			</div>

			<hr className="border-t border-secondary-300 w-[80%] mb-4" />
			<p className="text-secondary-400 font-bold">
				{t("footer.copyright")}
			</p>
		</footer>
	);
};

export default FooterSection;