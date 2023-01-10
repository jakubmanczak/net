import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation/Navigation";
import { ThemeProvider } from "next-themes";
import { useLayoutEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	useLayoutEffect(() => {
		if (window.localStorage.getItem("anims") === "false")
			document.body.classList.add("nomotion");
	}, []);
	return (
		<>
			<ThemeProvider disableTransitionOnChange>
				<Navigation />
				<span id="nav-skipped"></span>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
