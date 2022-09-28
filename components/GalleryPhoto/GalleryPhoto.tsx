import styles from "./GalleryPhoto.module.scss";
import Image from "next/image";

type GalleryPhotoProps = {
	name?: string;
	date?: string;
	desc?: string;
	src: string;
	alt: string;
};

const GalleryPhoto = (props: GalleryPhotoProps) => {
	return (
		<a href={props.src} className={styles.container}>
			<div className={styles.photowrapper}>
				<div className={styles.photo}>
					{/* <img src={props.src} alt={props.alt} /> */}
					<Image src={props.src} alt={props.alt} width="128px" height="128px" />
				</div>
			</div>
			<div className={styles.inner}>
				<h3>{props.name}</h3>
				<p className={styles.date}>{props.date}</p>
				<p className={styles.desc}>{props.desc}</p>
				{/* <p className={styles.help}></p> */}
			</div>
		</a>
	);
};

export default GalleryPhoto;
