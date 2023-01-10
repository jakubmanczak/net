import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SEO } from "../components/SEO";

export default function PageNotFound() {
	const router = useRouter();
	const [path, setPath] = useState<string>("");
	useEffect(() => {
		setPath(router.asPath);
	}, [router.isReady]);
	return (
		<>
			<SEO title="page not found!" onlygiventitle />
			<div className="constrained basicTopMargin basicAnim">
				<h1>ERROR 404</h1>
				<p>{path || "this path"} doesn't exist!</p>
				<Link href="/" className="button">
					Go back.
				</Link>
			</div>
		</>
	);
}
