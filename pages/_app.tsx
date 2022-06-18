import "/styles/master.scss";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>manczak.net!</title>
				<link rel="shortcut icon" href="jakub-circle.png" type="image/x-icon" />
			</Head>
			<Navigation />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
