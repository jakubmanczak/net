import { InferGetStaticPropsType, NextComponentType } from "next";
import styles from "./Project.module.scss";

type ProjectProps = {
	name?: string;
	link?: string;
	desc?: string;
	date?: string;
	classes?: string;
};

const Project = (props: ProjectProps) => {
	return (
		<a
			href={props.link}
			target="_blank"
			rel="noreferrer"
			className={`${props.classes} ${styles.projectcontainer}`}
		>
			<h1>{props.name}</h1>
			<p className={styles.linkvisualiser}>{props.link}</p>
			<p className={styles.description}>{props.desc}</p>
			<div className={styles.corner}>
				<p>{props.date}</p>
			</div>
		</a>
	);
};

export default Project;
