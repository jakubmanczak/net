import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import jakubimg from "../../public/jakubmanczak-picture.jpg";
import Image from "next/image";

interface ProfileProps {
	skipBio?: boolean;
}

const Profile = ({ skipBio }: ProfileProps) => {
	const [splash, setSplash] = useState<string>("");
	const elSplash = useRef<HTMLParagraphElement>(null);
	const elImage = useRef<HTMLDivElement>(null);
	function getSplash(): void {
		if (elSplash.current) {
			elSplash.current.classList.remove(styles.generated);
			let prevSplash = splash;
			fetch("https://api.manczak.net/splash?personal&games")
				.then((res) => {
					return res.ok ? res.text() : "404: splash not found";
				})
				.then((data) => {
					if (data !== prevSplash) {
						setSplash(data);
						elSplash.current?.classList.add(styles.generated);
					} else {
						getSplash();
					}
				})
				.catch((err) => {
					console.log(err);
					setSplash("err caught while fetching splash");
					elSplash.current?.classList.add(styles.generated);
				});
		}
	}
	useEffect(() => {
		getSplash();
	}, []);
	return (
		<div
			className={styles.container}
			style={skipBio ? { padding: "1rem 0" } : {}}
		>
			<div
				className={styles.txtside}
				style={{
					display: skipBio ? "flex" : "unset",
					flexDirection: "column",
					justifyContent: skipBio ? "center" : "unset",
				}}
			>
				<h2>jakub mańczak</h2>
				<p
					className={styles.splash}
					ref={elSplash}
					onClick={getSplash}
					style={
						skipBio
							? {
									height: "31px",
							  }
							: {}
					}
				>
					{splash}
				</p>
				{!skipBio && (
					<p>
						My name is{" "}
						<Link href="info" className="anchor">
							Jakub Mańczak
						</Link>
						, people online call me{" "}
						<Link href="info" className="anchor">
							jamesen
						</Link>{" "}
						and I{"'"}m learning IT at a High School in Poznań, Poland.
					</p>
				)}
			</div>
			<div className={styles.imgside} ref={elImage}>
				<Link href="/info" style={{ outline: "none" }}>
					<Image src={jakubimg} alt="image of jakub" />
				</Link>
			</div>
		</div>
	);
};

export { Profile };
