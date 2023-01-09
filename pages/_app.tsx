import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Navigation } from "../components/Navigation/Navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (!document) return;
		if (window.localStorage.getItem("colors") === "lite") {
			document.body.classList.add("litemode");
		}
		if (window.localStorage.getItem("anims") === "false") {
			document.body.classList.add("nomotion");
		}
	}, []);
	return (
		<>
			<Navigation />
			<span id="nav-skipped"></span>
			<Component {...pageProps} />
		</>
	);
}
