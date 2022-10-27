import styles from "./InfoPageContentBox.module.scss";
import Link from "next/link";

const contentLinks = [
	{
		name: "Gallery",
		href: "#gallery",
	},
	{
		name: "Aliases",
		href: "#aliases",
	},
];

const InfoPageContentBox = () => {
	return (
		<div className={`${styles.parent}`}>
			<p className="mutedtext">Content list for this page:</p>
			<div className={styles.list}>
				{contentLinks.map((el) => {
					return (
						<Link href={el.href}>
							<a>{el.name}</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default InfoPageContentBox;
