import Link from "next/link";
import { useRouter } from "next/router";
import { SEO } from "../components/SEO";

export default function PageNotFound() {
	const router = useRouter();
	return (
		<>
			<SEO title="page not found!" onlygiventitle />
			<div className="constrained basicTopMargin basicAnim">
				<h1>ERROR 404</h1>
				<p>{router.asPath || "this path"} doesn't exist!</p>
				{/* <button className="button">Go back.</button> */}
				<Link href="/" className="button">
					Go back.
				</Link>
			</div>
		</>
	);
}
