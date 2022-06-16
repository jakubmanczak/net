import { NextComponentType } from "next";
import styles from "./Navigation.module.scss";

import Link from "next/link";

import IconList from "../Icons/IconList";
import IconSliders from "../Icons/IconSliders";
import IconHome from "../Icons/IconHome";
import IconUser from "../Icons/IconUser";
import IconCode from "../Icons/IconCode";
import IconBookOpen from "../Icons/IconBookOpen";
import IconExternalLink from "../Icons/IconExternalLink";
import IconClipboard from "../Icons/IconClipboard";
import IconGithub from "../Icons/IconGitHub";
import IconLink from "../Icons/IconLink";
import IconFilm from "../Icons/IconFilm";
import IconVolume2 from "../Icons/IconVolume2";
import IconSun from "../Icons/IconSun";
import IconMoon from "../Icons/IconMoon";
import IconCheckSquare from "../Icons/IconCheckSquare";
import IconSquare from "../Icons/IconSquare";

const Navigation: NextComponentType = () => {
	return (
		<>
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
						<Link href="/blog">
							<a>
								<IconBookOpen />
								<p>Blog / Writings</p>
							</a>
						</Link>
						<Link href="/proj">
							<a>
								<IconClipboard />
								<p>Projects</p>
							</a>
						</Link>
						<div className={styles.divider}></div>
						<Link href="/github">
							<a>
								<IconGithub />
								<p>GitHub</p>
								<IconExternalLink />
							</a>
						</Link>
						<Link href="/links">
							<a>
								<IconLink />
								<p>All Links</p>
								<IconExternalLink />
							</a>
						</Link>
					</section>
				</div>
				{/* <p>manczak.net</p> */}
				<div className={styles.btnContainer}>
					<button>
						<IconSliders />
					</button>
					<section className={styles.rightlist}>
						<button disabled>
							<IconFilm />
							<p>Animations</p>
							<IconCheckSquare />
						</button>
						<button disabled>
							<IconVolume2 />
							<p>Sounds</p>
							<IconCheckSquare />
						</button>
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
						<Link href="/source">
							<a>
								<IconCode />
								<p>Source Code</p>
								<IconExternalLink />
							</a>
						</Link>
					</section>
				</div>
			</nav>
		</>
	);
};

export default Navigation;
