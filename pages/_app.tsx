import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation/Navigation";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<div className="constrained">
				<Navigation />
			</div>
			<Component {...pageProps} />
		</>
	);
}
