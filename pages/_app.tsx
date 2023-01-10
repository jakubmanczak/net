import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation/Navigation";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
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
