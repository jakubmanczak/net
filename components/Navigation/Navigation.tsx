import { NextComponentType } from "next";
import Link from "next/link";
import IconList from "../Icons/IconList";
import IconSliders from "../Icons/IconSliders";
import IconHome from "../Icons/IconHome";
import IconUser from "../Icons/IconUser";
import IconCode from "../Icons/IconCode";
import IconBookOpen from "../Icons/IconBookOpen";
import IconExternalLink from "../Icons/IconExternalLink";
import styles from "./Navigation.module.scss";

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
								<IconBookOpen />
								<p>Projects</p>
							</a>
						</Link>
						<div className={styles.divider}></div>
						<Link href="/github">
							<a>
								<IconBookOpen />
								<p>GitHub</p>
								<IconExternalLink />
							</a>
						</Link>
						<Link href="/links">
							<a>
								<IconBookOpen />
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
						<button>
							<IconCode />
							<p>Animations</p>
						</button>
						<button>
							<IconCode />
							<p>Sounds</p>
						</button>
						<div className={styles.divider}></div>
						<button>
							<IconCode />
							<p>Light Theme</p>
						</button>
						<button>
							<IconCode />
							<p>Dark Theme</p>
						</button>
						<div className={styles.divider}></div>
						<Link href="/source">
							<a>
								<IconCode />
								<p>Source Code</p>
							</a>
						</Link>
					</section>
				</div>
			</nav>
		</>
	);
};

export default Navigation;
