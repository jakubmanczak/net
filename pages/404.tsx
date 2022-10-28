import Link from "next/link";

const NotFound = () => {
	return (
		<>
			<div className="constrained centertext topmargin">
				<h1>four hundred and four.</h1>
				<p>
					{document ? document.location.pathname : "this location"} doesn't
					exist.{" "}
					<Link href="/">
						<a>Return to homepage.</a>
					</Link>
				</p>
			</div>
		</>
	);
};

export default NotFound;
