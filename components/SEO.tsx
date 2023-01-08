import Head from "next/head";

interface SEOprops {
	title?: string;
	onlygiventitle?: boolean;
}

const SEO = ({ title, onlygiventitle }: SEOprops) => {
	const computedTitle = title
		? onlygiventitle
			? title
			: `${title} @ manczak.net`
		: "manczak.net";
	return (
		<Head>
			<title>{computedTitle}</title>
		</Head>
	);
};

export { SEO };
