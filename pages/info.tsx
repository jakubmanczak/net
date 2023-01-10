import { Profile } from "../components/Profile/Profile";
import { SEO } from "../components/SEO";
import { getCurrentAge } from "../lib/age";

export default function PageInfo() {
	return (
		<>
			<SEO title="about me" />
			<div className="constrained basicTopMargin basicAnim">
				<Profile skipBio />
				<main>
					<h2 style={{ marginBottom: "4px" }}>about me</h2>
					<p style={{ textAlign: "justify" }}>
						Hello! My name is Jakub Mańczak, I{"'"}m {getCurrentAge()} and I was
						born in Poznań, Poland. <br /> <br />I am about halfway done with my
						education in a technical school. The things I'm interested in the
						most are what I hope to make my career one day, which is to say IT -
						the passion for which spawned from a child's love of video games. I
						find the tech behind interfaces shown to the user in electronic
						product fascinating, whether it's a website, piece of software, app
						or game.
					</p>
				</main>
			</div>
		</>
	);
}
