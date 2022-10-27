import type { NextPage } from "next";
import GalleryPhoto from "../components/GalleryPhoto/GalleryPhoto";
import InfoPageContentBox from "../components/InfoPageContentBox/InfoPageContentBox";

function age() {
	let today = new Date();
	let bdate = new Date("2004-08-28");
	let age = today.getFullYear() - bdate.getFullYear();
	let m = today.getMonth() - bdate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
		age--;
	}
	return age;
}

const InfoPage: NextPage = () => {
	return (
		<>
			<div className="constrained topmargin basicAnim">
				<h2>Jakub Mańczak</h2>
				<p className="mutedtext">A quick summary of who I am.</p>
				<p className="justifytext smalltopmargin">
					Hello! My name is Jakub Mańczak, I{"'"}m {age()} and I was born in
					Poznań, Poland. <br />
					<br />I am about halfway done with my education in a technical school.
					The things I{"'"}m interested in the most are what I hope to make my
					career one day, which is to say IT - the passion for it spawned from a
					child{"'"}s love of video games. I find the tech behind interfaces
					shown to the user in electronic product fascinating, whether it{"'"}s
					a website, desktop software, mobile app or a videogame.
				</p>
			</div>
			<div className="constrained basicAnim">
				<InfoPageContentBox />
			</div>
			{/* <p className="smalltopmargin centertext">
				Here's a list of content for this page:
			</p> */}
			<div id="gallery" />
			<div className="constrained midtopmargin basicAnim">
				<h3>Gallery</h3>
				<p className="mutedtext">Click a photo card to see the full file.</p>
				<GalleryPhoto
					src="/jakub.png"
					alt="most recent photo"
					name="fliegen"
					date="August of 2022"
					desc="Photo taken just before my flight from Geneva to Berlin."
				/>
				<GalleryPhoto
					src="/july2022.png"
					alt="me in the foreground, a bookshelf in the background"
					name="bookshelf, switzerland"
					date="July of 2022"
					desc="Photo taken at my dad's place in Valais, Switzerland."
				/>
				<GalleryPhoto
					src="/pstryk.jpg"
					alt="myself holding a camera, shooting a mirror"
					name="snap"
					date="April of 2022"
					desc="Yep, this one's going into my photo gallery."
				/>
				<GalleryPhoto
					src="/catearsfebruary.jpg"
					alt="me at the computer, view through a webcam, cat ears on head"
					name="furry bastard"
					date="February of 2022"
					desc="Screenshot of my webcam from a video chat."
				/>
				<GalleryPhoto
					src="/2021.jpg"
					alt="selfie in front of a bike-tire-window and flag of uk"
					name="2021"
					date="July of 2021"
					desc="Madded."
				/>
			</div>
			<div id="aliases" />
			<div className="constrained midtopmargin basicAnim">
				<h3>Aliases</h3>
				<p className="mutedtext">
					I{"'"}ve used a few names on the web in the past. Here{"'"}s those I
					remember.
				</p>
				<div className="justifytext smalltopmargin">
					<ul>
						{/* <li>jamesen</li>
						<li>jasen</li>
						<li>kubek</li>
						<li>j4mesen</li>
						<li>jakub228</li> */}
						<li>
							jamesen{" "}
							<span className="mutedtext">
								- my goto identity, coined sometime in 2017 as a merge of
								{" '"}james{"'"} and {"'"}en{"'"}, the latter taken from Gabe
								Newell{"'"}s iconic pseudonym.
							</span>
							<ul>
								<li>
									j4mesen{" "}
									<span className="mutedtext">
										- if the above is already taken.
									</span>
								</li>
								<li>
									j3mesen{" "}
									<span className="mutedtext">
										- if the above is extraordinarily taken.
									</span>
								</li>
								<li>
									jasen{" "}
									<span className="mutedtext">
										- a short version, coming from an intentional misspelling.
									</span>
								</li>
								<li>
									jmsen{" "}
									<span className="mutedtext">
										- current minecraft java username.
									</span>
								</li>
								<li>
									ジャメセン{" "}
									<span className="mutedtext">- nihongo kakkoi, suge.</span>
								</li>
							</ul>
						</li>
						<li>
							kubek{" "}
							<span className="mutedtext">
								- kuba, or jakub but also meaning {"'"}cup{"'"}.
							</span>
						</li>
						<li>
							jakub228{" "}
							<span className="mutedtext">
								- the name i used in Minecraft, 2012-2018.
							</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default InfoPage;
