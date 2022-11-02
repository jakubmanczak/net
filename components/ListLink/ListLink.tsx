import styles from "./ListLink.module.scss";

type ListLinkProps = {
	name?: string;
	href?: string;
	hrefalias?: string[];
	desc?: string;
};

const ListLink = (props: ListLinkProps) => {
	return (
		<>
			<a className={styles.listlink} href={props.href}>
				<h3>{props.name}</h3>
				<p className={`mutedtext ${styles.linkpre}`}>
					{props.hrefalias ? props.hrefalias[0] : ""}
				</p>
				<p>{props.desc}</p>
			</a>
		</>
	);
};

export default ListLink;
