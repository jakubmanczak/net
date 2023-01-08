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
					{/* <div className={styles.divider} />
					<Link href="/">
						<FeatherIcon icon="heart" />
						github
						<FeatherIcon
							icon="external-link"
							style={{ marginLeft: "auto", transform: "scale(.8)" }}
						/>
					</Link>
					<Link href="/">
						<FeatherIcon icon="heart" />
						twitter
						<FeatherIcon
							icon="external-link"
							style={{ marginLeft: "auto", transform: "scale(.8)" }}
						/>
					</Link>
					<Link href="/">
						<FeatherIcon icon="heart" />
						steam
						<FeatherIcon
							icon="external-link"
							style={{ marginLeft: "auto", transform: "scale(.8)" }}
						/>
					</Link> */}
				</div>
			</div>
			{/* <div className={styles.settingsParent}>
				<div tabIndex={0} className={styles.settingsButton}>
					<FeatherIcon icon="sliders" />
				</div>
				<div className={styles.settingsDropdown}>
					<Link href="bruh">hmm</Link>
				</div>
			</div> */}
		</>
	);
};

export { Navigation };
