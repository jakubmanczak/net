import Link from "next/link";
import { SEO } from "../components/SEO";
import linksjson from "../data/accounts.json";

export default function PageLinks() {
	return (
		<>
			<SEO title="links" />
			<div className="constrained basicTopMargin basicAnim">
				<h1>links and accounts</h1>
			</div>
			<div className="constrained basicAnim">
				<h3>accounts</h3>
				<div className="cardsflex">
					{linksjson
						.filter((link) => !!link.platform)
						.map((link) => {
							return (
								<Link
									href={link.href}
									className="card cardClickable flexgrow"
									key={link.href}
								>
									<div className="flexheader bottomSeparation">
										<h4>
											{link.platform || link.linkname || "Unnamed card."}{" "}
										</h4>
										<p style={{ marginLeft: "auto" }} className="muted">
											{link.username}
										</p>
									</div>
									<p className="muted">{link.desc}</p>
								</Link>
							);
						})}
				</div>
			</div>
			<div className="constrained basicAnim">
				<h3>links</h3>
				<div className="cardsflex">
					{linksjson
						.filter((link) => !!link.linkname)
						.map((link) => {
							return (
								<Link
									href={link.href}
									className="card cardClickable flexgrow"
									key={link.href}
								>
									<div className="flexheader bottomSeparation">
										<h4>
											{link.platform || link.linkname || "Unnamed card."}{" "}
										</h4>
										<p style={{ marginLeft: "auto" }} className="muted">
											{link.hrefalias?.[0] || "/"}
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
