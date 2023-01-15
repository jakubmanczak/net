import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation/Navigation";
import { ThemeProvider } from "next-themes";
import { useLayoutEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	useLayoutEffect(() => {
		if (window.localStorage.getItem("anims") === "false")
			document.body.classList.add("nomotion");
	}, []);
	return (
		<>
			<ThemeProvider disableTransitionOnChange>
				<Head>
					<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
				</Head>
				<Navigation />
				<span id="nav-skipped"></span>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
