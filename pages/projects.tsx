import Link from "next/link";
import { SEO } from "../components/SEO";

const projects = [
	{
		name: "Katakanize",
		desc: "Convert Latin script to Katakana with ease!",
		lang: "TypeScript",
		dotc: "#3178c6",
		href: "https://github.com/jakubmanczak/katakanize",
	},
	{
		name: "pesel",
		desc: "PESEL number verification and decoding.",
		lang: "Svelte",
		dotc: "#ff3e00",
		href: "https://github.com/jakubmanczak/pesel",
	},
	{
		name: "int-bitmap",
		desc: "NPM package: Manipulate JavaScript numbers like a bitmask.",
		lang: "TypeScript",
		dotc: "#3178c6",
		href: "https://github.com/jakubmanczak/int-bitmask",
	},
];

export default function PageProjects() {
	return (
		<>
			<SEO title="projects" />
			<div className="constrained basicTopMargin basicAnim">
				<h1>projects / portfolio</h1>
				<p className="muted">
					Things I{"'"}ve made I{"'"}d like to share.
				</p>
			</div>
			<div className="constrained basicAnim">
				<div className="cardsflex">
					{projects.map((project) => {
						return (
							<Link
								key={project.href}
								href={project.href}
								className="card cardClickable flexgrow"
								style={{ minWidth: "40%" }}
							>
								<div className="flexheader bottomSeparation">
									<h4>{project.name}</h4>
									<p style={{ marginLeft: "auto" }} className="muted">
										{project.lang}
									</p>
								</div>
								<p className="muted">{project.desc}</p>
							</Link>
						);
					})}
				</div>
			</div>
		</>
	);
}
