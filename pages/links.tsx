import Link from "next/link";
import { SEO } from "../components/SEO";
import linksjson from "../data/links.json";

export default function PageLinks() {
	return (
		<>
			<SEO title="links" />
			<div className="constrained basicTopMargin basicAnim">
				<h1>/links</h1>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						gap: "16px",
						padding: "16px 0",
					}}
				>
					{linksjson.map((link) => {
						return (
							<Link
								href={link.href}
								className="card cardClickable"
								style={{
									flexGrow: 1,
									width: 0,
								}}
								key={link.href}
							>
								<div className="flexheader">
									<h4> {link.name} </h4>
									<p
										style={{ color: "var(--clrMutedText)", marginLeft: "auto" }}
									>
										{link.hrefalias[0]}
									</p>
								</div>
								<p style={{ color: "var(--clrMutedText)" }}>{link.desc}</p>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}
