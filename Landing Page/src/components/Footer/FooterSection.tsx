import { useTranslation } from "react-i18next";
import { type ReactElement, type FC } from "react";
import ListItems from "@/components/Footer/ListItems";
import { SOCIAL_LINKS } from "@/constants/footer";

const FooterSection: FC = (): ReactElement => {
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
		<footer className="relative bg-secondary-900 text-white">
			{/* Gradient top bar */}
			<div className="h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

			<div className="max-w-6xl mx-auto px-6 py-16">
				<div className="grid md:grid-cols-4 gap-12 mb-12">
					{/* Brand column */}
					<div className="md:col-span-1">
						<div className="flex items-center gap-3 mb-4">
							<img
								src="/assets/svg/header-symbol.svg"
								alt="Logo"
								className="w-10 h-10 brightness-0 invert"
							/>
							<span className="font-bold text-xl text-white">
								Health
							</span>
						</div>
						<p className="text-secondary-400 text-sm leading-relaxed">
							{t("landingDescription")}
						</p>
					</div>

					<ListItems items={products} title={t("footer.products")} />
					<ListItems items={company} title={t("footer.company")} />
					<ListItems items={info} title={t("footer.info")} />
				</div>

				{/* Bottom bar */}
				<div className="pt-8 border-t border-secondary-800 flex flex-col sm:flex-row items-center justify-between gap-6">
					<div className="flex gap-4">
						<a
							href={SOCIAL_LINKS.facebook}
							aria-label="Facebook"
							className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
						>
							<img src="/assets/svg/facebook.svg" alt="Facebook" className="w-5 h-5 brightness-0 invert" />
						</a>
						<a
							href={SOCIAL_LINKS.twitter}
							aria-label="Twitter"
							className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
						>
							<img src="/assets/svg/twitter.svg" alt="Twitter" className="w-5 h-5 brightness-0 invert" />
						</a>
						<a
							href={SOCIAL_LINKS.google}
							aria-label="Google"
							className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center hover:bg-primary-600 transition-colors duration-300"
						>
							<img src="/assets/svg/google.svg" alt="Google" className="w-5 h-5 brightness-0 invert" />
						</a>
					</div>
					<p className="text-secondary-500 text-sm">
						{t("footer.copyright")}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default FooterSection;