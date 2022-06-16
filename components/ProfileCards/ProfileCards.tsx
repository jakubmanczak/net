import { NextComponentType } from "next";
import Link from "next/link";
import styles from "./ProfileCards.module.scss";

const ProfileCards: NextComponentType = () => {
	return (
		<>
			<div className={styles.container}>
				<Link href="/steam">
					<a className={styles.card}>steam</a>
				</Link>
				<Link href="/github">
					<a className={styles.card}>github</a>
				</Link>
			</div>
		</>
	);
};

export default ProfileCards;
