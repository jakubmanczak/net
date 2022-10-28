import styles from "./EducationChapter.module.scss";

type EducationChapterProps = {
	name?: string;
	fullname?: string;
	activeyears?: string;
	website?: string;
};

const EducationChapter = (props: EducationChapterProps) => {
	return (
		<a href={props.website} className={styles.parent}>
			<h3>{props.name}</h3>
			<p className="mutedtext"> {props.fullname} </p>
			<p className="mutedtext"> {props.activeyears} </p>
		</a>
	);
};

export default EducationChapter;
