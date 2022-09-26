import type { NextPage } from "next";
import Project from "../components/Project/Project";

const ProjPage: NextPage = () => {
	return (
		<>
			<div className="constrained topmargin">
				<div className="basicAnim">
					<h2>Projects</h2>
					<p className="mutedtext">
						Index of noteworthy things I{"'"}ve done, am doing or plan to do.
					</p>
				</div>
				<div className="projectlist">
					<Project
						name="PESEL"
						link="https://numerpesel.vercel.app"
						desc="A web app for validation and decoding of information hidden inside polish personal PESEL identifier numbers."
						date="September 2022"
						classes="basicAnim"
					/>
					<Project
						name="Katakanize"
						link="https://katakanize.vercel.app"
						desc="A web app that transliterates text written in the Latin alphabet to the Japanese 'katanana' alphabet for words of foreign origin."
						date="September 2022"
						classes="basicAnim"
					/>
				</div>
			</div>
		</>
	);
};

export default ProjPage;
