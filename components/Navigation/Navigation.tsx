import { NextComponentType } from "next";
import Link from "next/link";
import IconList from "../Icons/IconList";
import IconSliders from "../Icons/IconSliders";
import styles from "./Navigation.module.scss";

const Navigation: NextComponentType = () => {
	return (
		<>
			<nav className={styles.nav}>
				<button tabIndex={-1}>
					<IconList />
				</button>
				{/* <p>manczak.net</p> */}
				<button tabIndex={-1}>
					<IconSliders />
				</button>
			</nav>
		</>
	);
};

export default Navigation;
