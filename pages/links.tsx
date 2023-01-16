import Link from "next/link";
import { SEO } from "../components/SEO";
import linksjson from "../data/links.json";

export default function PageLinks() {
	return (
		<>
			<SEO title="links" />
			<div className="constrained basicTopMargin basicAnim">
				<h1>links and accounts</h1>
			</div>
			{/* <div className="constrained basicAnim">
				<h3>accouts</h3>
			</div> */}
			<div className="constrained basicAnim">
				<h3>links</h3>
				<p className="muted">
					these represent URLs which will redirect you to the proper website.
				</p>
			</div>
			<div className="constrained basicAnim">
				<div className="cardsflex">
					{linksjson.map((link) => {
						return (
							<Link
								href={link.href}
								className="card cardClickable flexgrow"
								key={link.href}
							>
								<div className="flexheader">
									<h4> {link.name} </h4>
									<p style={{ marginLeft: "auto" }} className="muted">
										{link.hrefalias[0]}
									</p>
								</div>
								<p className="muted">{link.desc}</p>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}
