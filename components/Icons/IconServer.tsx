import { NextComponentType } from "next";

const IconServer: NextComponentType = () => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-server"
			>
				<rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
				<rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
				<line x1="6" y1="6" x2="6.01" y2="6" />
				<line x1="6" y1="18" x2="6.01" y2="18" />
			</svg>
		</>
	);
};

export { IconServer };
