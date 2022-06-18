import type { NextPage } from "next";

const InfoPage: NextPage = () => {
	return (
		<>
			<div className="constrained topmargin">
				<h2>Jakub Mańczak</h2>
				<p className="mutedtext">A quick summary of who I am.</p>
				<p className="justifytext smalltopmargin">
					Hello! My name is Jakub Mańczak, I'm 17 and I was born in Poznań,
					Poland. <br />
					<br />I am about halfway done with my education in a technical school.
					The things I'm interested in the most are what I hope to make my
					career one day, which is to say IT - the passion for it spawned from a
					child's love of video games. I find the tech behind interfaces shown
					to the user in electronic product fascinating, whether it's a website,
					desktop software, mobile app or a videogame.
				</p>
			</div>
			{/* <p className="smalltopmargin centertext">
				Here's a list of content for this page:
			</p> */}
			<div className="constrained midtopmargin">
				<h3>Aliases</h3>
				<p className="mutedtext">
					I've used a few names on the web in the past. Here's those I remember.
				</p>
				<p className="justifytext smalltopmargin">
					<ul>
						<li>jamesen</li>
						<li>jasen</li>
						<li>kubek</li>
						<li>j4mesen</li>
						<li>jakub228</li>
					</ul>
				</p>
			</div>
		</>
	);
};

export default InfoPage;
