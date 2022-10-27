import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";

import Link from "next/link";
import Image from "next/image";

import jakub from "../../public/jakub.png";

const splashes = [
	"racoon incarnate",
	"featherless biped",
	"the installation wizard",
	"マニチャキュ・ヤクブ",
];

const Profile = () => {
	const [splash, setSplash] = useState("");
	useEffect(() => {
		setSplash(splashes[Math.floor(Math.random() * splashes.length)]);
	}, []);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.txtside}>
					<h2>jakub mańczak</h2>
					<p className={styles.splash}>{splash}</p>
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
						{/* &#x1F1F5;&#x1F1F1; */}
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
