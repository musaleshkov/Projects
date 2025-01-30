import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				welcome: "Be good to yourself",
				landingDescription: "We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.",
				quizButton: "Take the Quiz",
				whatWeCanHelpWith: "What we can help with",
				restartQuiz: "Restart Quiz",
				goBackToTheLandingPage: "Go to the Landing Page",
				backButton: "Back",
				loadingQuiz: "Loading Quiz",
				loadingHomePage: "Loading home",
				ErrorLoadingQuizData: "Error Loading home page",
				restartButton: "Restart Quiz",
				noQuizData: "No quiz data available.",
				resultSuccess: "Congratulations! 🎉 You did an amazing job on the quiz! Your hard work and dedication have paid off. Keep up the great work, and continue striving for excellence. Success is yours—celebrate this win and keep moving forward! 💪✨",
				resultRejected: "Thank you for taking the quiz! While this may not have been the result you were hoping for, remember that every setback is a setup for a comeback. Use this as an opportunity to learn, grow, and come back even stronger. You’ve got this! 💪🌟",
				hairLoss: {
					title: "HAIR LOSS",
					description1: "Hair loss needn't be irreversible. We can help!",
					description2: "We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.",
				},
				erectileDysfunction: {
					title: "ERECTILE DYSFUNCTION",
					description1: "Erections can be a tricky thing. But no need to feel down!",
					description2: "We're working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.",
				},
				footer: {
					products: "PRODUCT",
					popular: "Popular",
					trending: "Trending",
					guided: "Guided",
					productsList: "Products",
					company: "COMPANY",
					press: "Press",
					mission: "Mission",
					strategy: "Strategy",
					about: "About",
					info: "INFO",
					support: "Support",
					customerService: "Customer Service",
					getStarted: "Get Started",
					followUs: "FOLLOW US",
					copyright: "© 2025 Health Landing Page App. All rights reserved.",
				},
			},
		},
		fr: {
			translation: {
				welcome: "Soyez bon envers vous-même",
				landingDescription: "Nous travaillons sans relâche pour vous offrir une approche holistique de votre bien-être. De haut en bas, à l'intérieur et à l'extérieur.",
				quizButton: "Faire le Quiz",
				whatWeCanHelpWith: "Ce avec quoi nous pouvons aider",
				resultSuccess: "Félicitations ! 🎉 Vous avez fait un travail remarquable sur le quiz ! Votre travail acharné et votre dévouement ont porté leurs fruits. Continuez votre excellent travail et efforcez-vous toujours d'atteindre l'excellence. Le succès est à vous—célébrez cette victoire et continuez à avancer ! 💪✨",
				resultRejected: "Merci d'avoir participé au quiz ! Même si ce n'est peut-être pas le résultat que vous espériez, rappelez-vous que chaque revers est une préparation pour un retour en force. Profitez de cette opportunité pour apprendre, grandir et revenir encore plus fort. Vous en êtes capable ! 💪🌟",
				hairLoss: {
					title: "PERTE DE CHEVEUX",
					description1: "La perte de cheveux ne doit pas être irréversible. Nous pouvons vous aider !",
					description2: "Nous travaillons sans relâche pour vous offrir une approche holistique de votre bien-être. De haut en bas, à l'intérieur et à l'extérieur.",
				},
				erectileDysfunction: {
					title: "DYSFONCTION ÉRECTILE",
					description1: "Les érections peuvent être délicates. Mais pas besoin de se décourager !",
					description2: "Nous travaillons sans relâche pour vous offrir une approche holistique de votre bien-être. De haut en bas, à l'intérieur et à l'extérieur.",
				},
				footer: {
					products: "PRODUIT",
					popular: "Populaire",
					trending: "Tendance",
					guided: "Guidé",
					productsList: "Produits",
					company: "ENTREPRISE",
					press: "Presse",
					mission: "Mission",
					strategy: "Stratégie",
					about: "À propos",
					info: "INFO",
					support: "Support",
					customerService: "Service client",
					getStarted: "Commencer",
					followUs: "SUIVEZ-NOUS",
					copyright: "© 2025 Health Landing Page App. All rights reserved.",
				},
			},
		},
	},
	lng: "en",
	fallbackLng: "en",
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
