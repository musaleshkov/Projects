import { useTranslation } from "react-i18next";
import { type FunctionComponent, type ReactElement } from "react";

const InfoSection: FunctionComponent = (): ReactElement => {
	const { t } = useTranslation();

	return (
		<section className="w-full py-8 text-center flex flex-col items-center justify-center">
			<h2 className="text-3xl font-bold text-foreground mb-8">
				{t("whatWeCanHelpWith")}
			</h2>

			<div className="flex flex-col items-center justify-center mt-8 max-w-[50em] px-6">
				{/* Hair Loss Item */}
				<div className="flex flex-row justify-between items-center bg-no-repeat bg-center bg-[length:40%] max-sm:flex-col-reverse w-full"
					style={{ backgroundImage: "url(/assets/svg/01.svg)" }}
				>
					<div>
						<img
							src="/assets/svg/SecondSectionProfilePerson.svg"
							alt="Hair Loss"
							className="w-full max-w-[300px] mb-4"
						/>
					</div>
					<div className="flex flex-col text-left w-[40%] max-sm:w-[65%]">
						<h3 className="text-xs text-secondary-400 font-bold -mb-4">
							{t("hairLoss.title")}
						</h3>
						<h3 className="text-2xl font-bold text-foreground mb-4">
							{t("hairLoss.description1")}
						</h3>
						<p className="text-base text-foreground mb-4 leading-relaxed">
							{t("hairLoss.description2")}
						</p>
					</div>
				</div>

				{/* Erectile Dysfunction Item */}
				<div className="flex flex-row justify-between items-center bg-no-repeat bg-center bg-[length:40%] max-sm:flex-col pt-20 w-full"
					style={{ backgroundImage: "url(/assets/svg/02.svg)" }}
				>
					<div className="flex flex-col text-left w-[40%] max-sm:w-[65%]">
						<h3 className="text-xs text-secondary-400 font-bold -mb-4">
							{t("erectileDysfunction.title")}
						</h3>
						<h3 className="text-2xl font-bold text-foreground mb-4">
							{t("erectileDysfunction.description1")}
						</h3>
						<p className="text-base text-foreground mb-4 leading-relaxed">
							{t("erectileDysfunction.description2")}
						</p>
					</div>
					<div>
						<img
							src="/assets/svg/ThirdSectionProfilePerson.svg"
							alt="Erectile Dysfunction"
							className="w-full max-w-[300px] mb-4"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoSection;