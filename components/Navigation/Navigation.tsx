import styles from "./Navigation.module.scss";

import Link from "next/link";

import IconList from "../Icons/IconList";
import IconSliders from "../Icons/IconSliders";
import IconSearch from "../Icons/IconSearch";
import IconHome from "../Icons/IconHome";
import IconUser from "../Icons/IconUser";
import IconCode from "../Icons/IconCode";
import IconBookOpen from "../Icons/IconBookOpen";
import IconExternalLink from "../Icons/IconExternalLink";
import IconClipboard from "../Icons/IconClipboard";
import IconLink from "../Icons/IconLink";
import IconFilm from "../Icons/IconFilm";
import IconVolume2 from "../Icons/IconVolume2";
import IconSun from "../Icons/IconSun";
import IconMoon from "../Icons/IconMoon";
import IconCheckSquare from "../Icons/IconCheckSquare";
import IconSquare from "../Icons/IconSquare";
import IconCommand from "../Icons/IconCommand";
import IconOriginalGithub from "../Icons/IconOriginalGithub";
import IconOriginalSteam from "../Icons/IconOriginalSteam";
import IconOriginalTwitter from "../Icons/IconOriginalTwitter";
import { useState, useEffect, useRef, ChangeEvent } from "react";

const Navigation = () => {
	const [searchphrase, SetSearchPhrase] = useState("");
	const searchboxref = useRef<HTMLInputElement>(null);
	const resultsref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleKeydown = (ev: KeyboardEvent) => {
			// if (ev.ctrlKey && ev.key == "k") {
			if (ev.ctrlKey && ev.key == "/") {
				searchboxref.current?.focus();
			}
		};
		document.body.addEventListener("keydown", handleKeydown);
		return () => {
			document.body.removeEventListener("keydown", handleKeydown);
		};
	}, []);
	useEffect(() => {
		if (searchphrase) {
			resultsref.current?.classList.add(styles.resultvisible);
		} else {
			resultsref.current?.classList.remove(styles.resultvisible);
		}
	}, [searchphrase]);
	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		SetSearchPhrase(ev.target.value);
	};
	return (
		<>
			<a href="#nav-skipped" className={styles.skipnav}>
				Skip Navigation?
			</a>
			<nav className={styles.nav}>
				<div className={styles.btnContainer}>
					<button>
						<IconList />
					</button>
					<section className={styles.leftlist}>
						<Link href="/">
							<a>
								<IconHome />
								<p>Homepage</p>
							</a>
						</Link>
						<Link href="/info">
							<a>
								<IconUser />
								<p>About Me</p>
							</a>
						</Link>
						<Link href="/read">
							<a>
								<IconBookOpen />
								<p>Writings / Blog</p>
							</a>
						</Link>
						<Link href="/projects">
							<a>
								<IconClipboard />
								<p>Projects / Tools</p>
							</a>
						</Link>
						<div className={styles.divider}></div>
						<Link href="/links">
							<a>
								<IconLink />
								<p>All Links</p>
							</a>
						</Link>
						<div className={styles.divider}></div>
						<Link href="/github">
							<a>
								<IconOriginalGithub />
								<p>GitHub</p>
								<IconExternalLink />
							</a>
						</Link>
						<Link href="/twitter">
							<a>
								<IconOriginalTwitter />
								<p>Twitter</p>
								<IconExternalLink />
							</a>
						</Link>
						<Link href="/steam">
							<a>
								<IconOriginalSteam />
								<p>Steam</p>
								<IconExternalLink />
							</a>
						</Link>
						{/* <div className={styles.divider}></div> */}
					</section>
				</div>
				<div className={styles.searchbox}>
					<div className={styles.inputbox}>
						<IconSearch />
						<input
							tabIndex={-1}
							ref={searchboxref}
							placeholder="Input your search query here!"
							type="text"
							value={searchphrase}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.results} ref={resultsref}>
						<p>
							No results for{" "}
							{searchphrase.length < 32 ? `"${searchphrase}"` : "your query"}...
							Yet.
						</p>
					</div>
				</div>
				<div className={styles.btnContainer}>
					<button>
						<IconSliders />
					</button>
					<section className={styles.rightlist}>
						<button disabled>
							<IconVolume2 />
							<p>Sounds</p>
							<IconCheckSquare />
						</button>
						<button disabled>
							<IconFilm />
							<p>Animations</p>
							<IconCheckSquare />
						</button>
						{/* <p className="mutedtext centertext">Browser-wide nomotion on.</p> */}
						<div className={styles.divider}></div>
						<button disabled>
							<IconSun />
							<p>Light Theme</p>
							<IconSquare />
						</button>
						<button disabled>
							<IconMoon />
							<p>Dark Theme</p>
							<IconCheckSquare />
						</button>
						<div className={styles.divider}></div>
						<button disabled>
							<IconCommand />
							<p>Shortcuts &amp; Secrets</p>
						</button>
						<div className={styles.divider}></div>
						<Link href="/source">
							<a>
								<IconCode />
								<p>Source Code</p>
								<IconExternalLink />
							</a>
						</Link>
						{/* <div className={styles.divider}></div> */}
						<p
							className="mutedtext centertext"
							style={{ opacity: 0.5, marginTop: "2px" }}
						>
							&copy; Jakub Mańczak <br /> 2019-{new Date().getFullYear()}
						</p>
					</section>
				</div>
			</nav>
		</>
	);
};

export default Navigation;
