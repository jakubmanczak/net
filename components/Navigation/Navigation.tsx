import Link from "next/link";
import { FeatherIcon } from "../FeatherIcon";
import styles from "./Navigation.module.scss";

const Navigation = () => {
	return (
		<>
			<div className={styles.pagesParent}>
				<div tabIndex={0} className={styles.pagesButton}>
					<FeatherIcon icon="list" />
				</div>
				<div className={styles.pagesDropdown}>
					<Link href="/">
						<FeatherIcon icon="home" />
						homepage
					</Link>
					<Link href="info">
						<FeatherIcon icon="user" />
						about me
					</Link>
					<Link href="/projects">
						<FeatherIcon icon="cpu" />
						projects
					</Link>
					<Link href="/read">
						<FeatherIcon icon="clipboard" />
						writings
					</Link>
					<div className={styles.divider} />
					<Link href="/links">
						<FeatherIcon icon="link" />
						links and accounts
					</Link>
					{/* <div className={styles.divider} /> */}
					<Link href="/">
						<FeatherIcon icon="github" />
						github
						<FeatherIcon icon="external-link" className={styles.statusicon} />
					</Link>
					<Link href="/">
						<FeatherIcon icon="twitter" />
						twitter
						<FeatherIcon icon="external-link" className={styles.statusicon} />
					</Link>
				</div>
			</div>
			<div className={styles.settingsParent}>
				<div tabIndex={0} className={styles.settingsButton}>
					<FeatherIcon icon="sliders" />
				</div>
				<div className={styles.settingsDropdown}>
					<button>
						<FeatherIcon />
						sounds
						<FeatherIcon icon="square" className={styles.statusicon} />
						<FeatherIcon icon="square" className={styles.statusicon} />
					</button>
					<button>
						<FeatherIcon />
						fluid animations
						<FeatherIcon icon="check-square" className={styles.statusicon} />
						<FeatherIcon icon="square" className={styles.statusicon} />
					</button>
					<div className={styles.divider} />
					<Link href="/">
						<FeatherIcon icon="hard-drive" />
						source code
						<FeatherIcon icon="external-link" className={styles.statusicon} />
					</Link>
				</div>
			</div>
		</>
	);
};

export { Navigation };
