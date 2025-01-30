const sizes = {
	mobile: "480px",
	tablet: "768px",
};

type MediaQueries = {
	[key: string]: string;
};

const media: MediaQueries = Object.keys(sizes).reduce((acc: MediaQueries, label: string) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	acc[label] = `@media (max-width: ${sizes[label]})`;
	return acc;
}, {} as MediaQueries);

export default media;
