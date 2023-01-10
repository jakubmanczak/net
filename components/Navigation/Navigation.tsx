import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FeatherIcon } from "../FeatherIcon";
import styles from "./Navigation.module.scss";

const Navigation = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);
	useEffect(() => {
		setMounted(true);
	}, []);
	const [cntrlSound, setCntrlSound] = useState<boolean>(false);
	const [cntrlAnims, setCntrlAnims] = useState<boolean>(true);
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
						animations
						{cntrlAnims && (
							<FeatherIcon icon="check-square" className={styles.statusicon} />
						)}
						{!cntrlAnims && (
							<FeatherIcon icon="square" className={styles.statusicon} />
						)}
					</button>
					<div className={styles.divider} />
					{mounted && (
						<>
							<button
								onClick={() => {
									setTheme("lite");
								}}
							>
								<FeatherIcon icon="sun" />
								light theme
								{theme == "lite" && (
									<FeatherIcon
										icon="check-square"
										className={styles.statusicon}
									/>
								)}
								{theme != "lite" && (
									<FeatherIcon icon="square" className={styles.statusicon} />
								)}
							</button>
							<button
								onClick={() => {
									setTheme("dark");
								}}
							>
								<FeatherIcon icon="moon" />
								dark theme
								{theme == "dark" && (
									<FeatherIcon
										icon="check-square"
										className={styles.statusicon}
									/>
								)}
								{theme != "dark" && (
									<FeatherIcon icon="square" className={styles.statusicon} />
								)}
							</button>
						</>
					)}
					<div className={styles.divider} />
					<button
						onClick={() => {
							console.log("nothing here - tricked ya!");
						}}
					>
						<FeatherIcon icon="heart" />
						secrets
					</button>
					<Link href="/source-code">
						<FeatherIcon icon="hard-drive" />
						source code
						<FeatherIcon icon="external-link" className={styles.statusicon} />
					</Link>
					<div className={styles.divider} />
					<p className={styles.credits}>
						&copy; Jakub Mańczak <br />
						2019-{new Date().getFullYear()}
					</p>
				</div>
			</div>
		</>
	);
};

export { Navigation };
