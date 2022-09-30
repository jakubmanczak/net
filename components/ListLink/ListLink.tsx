import styles from "./ListLink.module.scss";

type ListLinkProps = {
	name?: string;
	href?: string;
	desc?: string;
};

const ListLink = (props: ListLinkProps) => {
	return (
		<>
			<a className={styles.listlink} href={props.href}>
				<h3>{props.name}</h3>
				<p className={`mutedtext ${styles.linkpre}`}>{props.href}</p>
				<p>{props.desc}</p>
			</a>
		</>
	);
};

export default ListLink;
