import { Profile } from "../components/Profile/Profile";
import { SEO } from "../components/SEO";

export default function PageIndex() {
	return (
		<>
			<SEO />
			<div className="constrained">
				<div style={{ marginTop: "12rem" }}>
					<Profile />
				</div>
			</div>
		</>
	);
}
