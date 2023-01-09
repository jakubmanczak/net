import Link from "next/link";
import { useState } from "react";
import { FeatherIcon } from "../FeatherIcon";
import styles from "./Navigation.module.scss";

const Navigation = () => {
	const [cntrlSound, setCntrlSound] = useState<boolean>(false);
	const [cntrlAnims, setCntrlAnims] = useState<boolean>(true);
	const [cntrlClrScheme, setCntrlClrScheme] = useState<"dark" | "lite">("dark");
	function soundsBtnClick() {
		setCntrlSound(!cntrlSound);
		if (!document) return;
		document.body.classList.toggle("nosounds");
	}
	function animsBtnClick() {
		setCntrlAnims(!cntrlAnims);
		if (!document) return;
		document.body.classList.toggle("nomotion");
	}
	function setClrSchemeToDark() {
		setCntrlClrScheme("dark");
	}
	function setClrSchemeToLite() {
		setCntrlClrScheme("lite");
	}
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
					{/* <button onClick={soundsBtnClick}>
						<FeatherIcon icon="heart" />
						sounds
						{controlSound && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{!controlSound && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button> */}
					<button onClick={animsBtnClick}>
						<FeatherIcon icon="heart" />
						fluid motion
						{cntrlAnims && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{!cntrlAnims && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					{/* <div className={styles.divider} />
					<button onClick={setClrSchemeToDark}>
						<FeatherIcon icon="heart" />
						dark scheme
						{cntrlClrScheme == "dark" && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{cntrlClrScheme != "dark" && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					<button onClick={setClrSchemeToLite}>
						<FeatherIcon icon="heart" />
						light scheme
						{cntrlClrScheme == "lite" && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{cntrlClrScheme != "lite" && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>*/}
					<div className={styles.divider} />
					<Link href="/source-code">
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
