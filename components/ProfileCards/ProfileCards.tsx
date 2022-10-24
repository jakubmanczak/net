import { NextComponentType } from "next";
import Link from "next/link";
import styles from "./ProfileCards.module.scss";

const ProfileCards: NextComponentType = () => {
	return (
		<>
			<div className={`${styles.container} basicAnim`}>
				<Link href="/info">
					<a className={`${styles.card} `}>About Me</a>
				</Link>
				<Link href="/read">
					<a className={`${styles.card} `}>My Writings</a>
				</Link>
				<Link href="/projects">
					<a className={`${styles.card} `}>Projects / Portfolio</a>
				</Link>
				<Link href="/links">
					<a className={`${styles.card} `}>Links</a>
				</Link>
			</div>
			{/* <br />
			<br />
			<section className={styles.section}>
				<h3>Latest Blog Entries</h3>
				<hr />
			</section> */}
		</>
	);
};

export default ProfileCards;
