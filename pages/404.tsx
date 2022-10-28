import Link from "next/link";
import { useEffect, useState } from "react";

const NotFound = () => {
	const [path, setPath] = useState("this location");
	useEffect(() => {
		if (document) {
			setPath(document.location.pathname);
		}
	}, []);
	return (
		<>
			<div className="constrained centertext topmargin">
				<h1>four hundred and four.</h1>
				<p>
					{path} doesn{"'"}t exist.{" "}
					<Link href="/">
						<a>Return to homepage.</a>
					</Link>
				</p>
			</div>
		</>
	);
};

export default NotFound;
