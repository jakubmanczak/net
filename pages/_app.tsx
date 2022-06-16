import "/styles/master.scss";
import type { AppProps } from "next/app";
import Navigation from "../components/Navigation/Navigation";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>manczak.net!</title>
			</Head>
			<Navigation />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
