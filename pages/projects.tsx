import { SEO } from "../components/SEO";

export default function PageProjects() {
	return (
		<>
			<SEO title="projects" />
			<div className="constrained basicAnim" style={{ marginTop: "6rem" }}>
				<h1>/projects</h1>
				<p>This page is currently empty.</p>
			</div>
			<br />
			<br />
			<br />
			<div className="constrained basicAnim">
				<h3>rework work in progress list:</h3>
				<ul>
					<li>404 error page</li>
					<li>populate /about with prior content</li>
					<li>populate /links with prior content based on links.json data</li>
					<li>figure out a nice layout for all 'reading' types for /read</li>
					<li>settings panel</li>
					<li>nomotion controls</li>
					<li>light mode controls</li>
					<li>sounds controls? also add sounds</li>
					<li>search panel</li>
					<li>'shortcuts and secrets'</li>
					<li>source code link in settings panel</li>
					<li>copyright attribution</li>
				</ul>
				<br />
				<h3>also unrelated to /net but to /api kinda</h3>
				<ul>
					<li>swap api from files to db (postgres or sqlite)</li>
					<li>fetch data from that db</li>
					<li>add schemas for writings (poematic, blog-like, article)</li>
				</ul>
			</div>
		</>
	);
}
