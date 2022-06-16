import { NextComponentType } from "next";
import styles from "./Profile.module.scss";

import Link from "next/link";
import Image from "next/image";

import jakub from "../../public/jakub.png";

const Profile: NextComponentType = () => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.txtside}>
					<h2>jakub mańczak</h2>
					<p className={styles.splash}>the installation wizard</p>
					<p>
						My name is{" "}
						<Link href="/info">
							<a>Jakub Mańczak</a>
						</Link>
						, people online call me{" "}
						<Link href="/info#aliases">
							<a>jamesen</a>
						</Link>{" "}
						and I{"'"}m learning IT at a High School in Poznań, Poland.
					</p>
				</div>
				<div className={styles.imgside}>
					{/* <img src="/jakub.png" alt="me!" /> */}
					<Link href="/info#gallery">
						<a>
							<Image src={jakub} alt="Picture of jakub mańczak" />
						</a>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Profile;
