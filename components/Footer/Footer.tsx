import { NextComponentType } from "next";
import styles from "./Footer.module.scss";

const Footer: NextComponentType = () => {
	return (
		<>
			<footer className={styles.container}>
				manczak.net
				<span className="mutedtext">
					{" "}
					~ 2019 - 2022 <br />
					&copy; Jakub Mańczak
				</span>
			</footer>
		</>
	);
};

export default Footer;
