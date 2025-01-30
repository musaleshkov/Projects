import axios from "axios";
import { QuizData } from "@/types/quiz";

let retryCount: number = 0;
const MAX_RETRIES: number = 5;
const TIMEOUT: number = 5000;

export const localQuizData: QuizData = {
	questions: [
		{
			question: "Which image best matches your hair loss?",
			type: "ChoiceType",
			options: [
				{
					display: "<img alt='Temples' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/temples-hairloss.png' />",
					value: "Temples",
					isRejection: false,
				},
				{
					display: "<img alt='Temples & Crown' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/templescrown-hairloss.png' />",
					value: "Temples & Crown",
					isRejection: false,
				},
				{
					display: "<img alt='Patchy' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/patchy-hairloss.png' />",
					value: "Patchy",
					isRejection: true,
				},
				{
					display: "<img alt='Moderate' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/moderate-hairloss.png' />",
					value: "Moderate",
					isRejection: false,
				},
				{
					display: "<img alt='Extensive' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/extensive-hairloss.png' />",
					value: "Extensive",
					isRejection: true,
				},
				{
					display: "<img alt='Complete' src='https://s3-eu-west-1.amazonaws.com/manualco/questions/complete-hairloss.png' />",
					value: "Complete",
					isRejection: true,
				},
			],
		},
		{
			question: "Have you ever been diagnosed with prostate cancer, or are you currently undergoing PSA/Prostate monitoring?",
			type: "ChoiceType",
			options: [
				{ display: "Yes", value: true, isRejection: true },
				{ display: "No", value: false, isRejection: false },
			],
		},
		{
			question: "Have you ever been diagnosed with breast cancer or noticed any changes in your breast tissue such as lumps, pain, nipple discharge or swelling?",
			type: "ChoiceType",
			options: [
				{ display: "Yes", value: true, isRejection: true },
				{ display: "No", value: false, isRejection: false },
			],
		},
	],
};

export const fetchQuizData = async (): Promise<QuizData> => {
	try {
		console.log("Fetching quiz data from API...");
		const response = await axios.get("/api/questionnaires/972423.json", { timeout: TIMEOUT });
		console.log("API response:", response.data);
		return response.data;
	} catch (error) {
		console.warn("Error fetching quiz data:", error);
		if (retryCount < MAX_RETRIES) {
			retryCount++;
			return fetchQuizData();
		}
		console.log("Using local quiz data as fallback.");
		retryCount = 0;
		return localQuizData;
	}
};
