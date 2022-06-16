import { NextComponentType } from "next";
import styles from "./Profile.module.scss";

import Link from "next/link";

const Profile: NextComponentType = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.txtside}>
					<h2>jakub mańczak</h2>
					<p className={styles.splash}>the installation wizard</p>
					<p>
						My name is <Link href="/">Jakub Mańczak</Link>, people online call
						me <Link href="/">jamesen</Link> and I{"'"}m learning IT at a High
						School in Poznań, Poland.
					</p>
				</div>
				<div className={styles.imgside}>
					<img src="/jakub.png" alt="me!" />
				</div>
			</div>
		</>
	);
};

export default Profile;
