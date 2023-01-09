import Link from "next/link";
import { useEffect, useState } from "react";
import { FeatherIcon } from "../FeatherIcon";
import styles from "./Navigation.module.scss";

const Navigation = () => {
	const [cntrlSound, setCntrlSound] = useState<boolean>(false);
	const [cntrlAnims, setCntrlAnims] = useState<boolean>(true);
	const [clrScheme, setClrScheme] = useState<"dark" | "lite">("dark");
	useEffect(() => {
		if (window.localStorage.getItem("colors") === "lite") setClrScheme("lite");
		if (window.localStorage.getItem("anims") === "false") setCntrlAnims(false);
	}, []);
	function animsBtnClick() {
		window.localStorage.setItem("anims", !cntrlAnims ? "true" : "false");
		document?.body.classList.toggle("nomotion");
		setCntrlAnims(!cntrlAnims);
	}
	function soundsBtnClick() {
		// window.localStorage.setItem("sounds", !cntrlSound ? "true" : "false");
		// document?.body.classList.toggle("nosounds");
		setCntrlSound(!cntrlSound);
	}
	function setClrSchemeToDark() {
		setClrScheme("dark");
		document?.body.classList.remove("litemode");
		window.localStorage.setItem("colors", "dark");
	}
	function setClrSchemeToLite() {
		setClrScheme("lite");
		document?.body.classList.add("litemode");
		window.localStorage.setItem("colors", "lite");
	}
	return (
		<>
			<a tabIndex={0} href="#nav-skipped" className={styles.naviSkipper}>
				skip navigation?
			</a>
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
					<Link href="/github">
						<FeatherIcon icon="github" />
						github
						<FeatherIcon icon="external-link" className={styles.statusicon} />
					</Link>
					<Link href="/twitter">
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
					<button onClick={soundsBtnClick} disabled>
						<FeatherIcon icon="bell" />
						sounds
						{cntrlSound && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{!cntrlSound && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					<button onClick={animsBtnClick}>
						<FeatherIcon icon="film" />
						fluid motion
						{cntrlAnims && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{!cntrlAnims && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					<div className={styles.divider} />
					<button onClick={setClrSchemeToDark}>
						<FeatherIcon icon="moon" />
						dark scheme
						{clrScheme == "dark" && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{clrScheme != "dark" && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					<button onClick={setClrSchemeToLite}>
						<FeatherIcon icon="sun" />
						light scheme
						{clrScheme == "lite" && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{clrScheme != "lite" && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
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
