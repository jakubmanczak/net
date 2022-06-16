import type { NextPage } from "next";
import Footer from "../components/Footer/Footer";
import Profile from "../components/Profile/Profile";
import ProfileCards from "../components/ProfileCards/ProfileCards";

const Index: NextPage = () => {
	return (
		<>
			<div className="constrained">
				<Profile />
				<ProfileCards />
				{/* <Footer /> */}
			</div>
		</>
	);
};

export default Index;
