import { useTranslation } from "react-i18next";
import { type ReactElement, type FC } from "react";
import { useInView } from "@/hooks/useInView";

const InfoSection: FC = (): ReactElement => {
	const { t } = useTranslation();
	const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.15 });

	return (
		<section
			ref={ref}
			className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-secondary-50"
		>
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-16">
					<span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
						{t("whatWeCanHelpWith")}
					</span>
					<h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
						{t("whatWeCanHelpWith")}
					</h2>
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{/* Hair Loss Card */}
					<div
						className={`group relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ${
							isInView ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-6"
						}`}
						style={isInView ? { animationDelay: "0.1s", animationFillMode: "forwards" } : undefined}
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-bl-[100px] rounded-tr-3xl -z-0" />
						<div className="relative z-10">
							<div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
								<img
									src="/assets/svg/SecondSectionProfilePerson.svg"
									alt="Hair Loss"
									className="w-10 h-10 object-contain"
								/>
							</div>
							<span className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 block">
								{t("hairLoss.title")}
							</span>
							<h3 className="text-2xl font-bold text-foreground mb-3">
								{t("hairLoss.description1")}
							</h3>
							<p className="text-secondary-600 leading-relaxed">
								{t("hairLoss.description2")}
							</p>
						</div>
					</div>

					{/* Erectile Dysfunction Card */}
					<div
						className={`group relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 ${
							isInView ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-6"
						}`}
						style={isInView ? { animationDelay: "0.2s", animationFillMode: "forwards" } : undefined}
					>
						<div className="absolute top-0 right-0 w-32 h-32 bg-accent-100/50 rounded-bl-[100px] rounded-tr-3xl -z-0" />
						<div className="relative z-10">
							<div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mb-6">
								<img
									src="/assets/svg/ThirdSectionProfilePerson.svg"
									alt="Erectile Dysfunction"
									className="w-10 h-10 object-contain"
								/>
							</div>
							<span className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-3 block">
								{t("erectileDysfunction.title")}
							</span>
							<h3 className="text-2xl font-bold text-foreground mb-3">
								{t("erectileDysfunction.description1")}
							</h3>
							<p className="text-secondary-600 leading-relaxed">
								{t("erectileDysfunction.description2")}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default InfoSection;