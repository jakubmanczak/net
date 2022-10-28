import type { NextPage } from "next";
import config from "../data/config.json";
import ListLink from "../components/ListLink/ListLink";

const LinkPage: NextPage = () => {
	return (
		<>
			<div className="constrained topmargin">
				<div className="basicAnim">
					<h2>Links</h2>
					<p className="mutedtext">
						Index of redirects, shortcuts, profiles or accounts.
					</p>
					<div className="linklist">
						{config.links.map((link) => {
							return (
								<ListLink
									key={link.name}
									name={link.name}
									href={link.href}
									desc={link.desc}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default LinkPage;
