import { Profile } from "../components/Profile/Profile";
import { SEO } from "../components/SEO";

export default function PageIndex() {
	return (
		<>
			<SEO />
			<div className="constrained">
				<Profile />
			</div>
		</>
	);
}
