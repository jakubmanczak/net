interface FeatherIconProps extends React.SVGProps<SVGSVGElement> {
	width?: number;
	height?: number;
	icon:
		| "heart"
		| "list"
		| "sliders"
		| "home"
		| "user"
		| "book"
		| "book-open"
		| "clipboard"
		| "cpu"
		| "link"
		| "link2"
		| "external-link"
		| "github"
		| "twitter"
		| "hard-drive"
		| "git-pull-request"
		| "coffee"
		| "square"
		| "check-square"
		| "x-square"
		| "bell"
		| "film"
		| "moon"
		| "sun";
}

const FeatherIcon = ({ icon, width, height, ...props }: FeatherIconProps) => {
	switch (icon) {
		default:
		case "heart":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-heart"
					{...props}
				>
					<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
				</svg>
			);
		case "list":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-list"
					{...props}
				>
					<line x1="8" y1="6" x2="21" y2="6" />
					<line x1="8" y1="12" x2="21" y2="12" />
					<line x1="8" y1="18" x2="21" y2="18" />
					<line x1="3" y1="6" x2="3.01" y2="6" />
					<line x1="3" y1="12" x2="3.01" y2="12" />
					<line x1="3" y1="18" x2="3.01" y2="18" />
				</svg>
			);
		case "sliders":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-sliders"
					{...props}
				>
					<line x1="4" y1="21" x2="4" y2="14" />
					<line x1="4" y1="10" x2="4" y2="3" />
					<line x1="12" y1="21" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12" y2="3" />
					<line x1="20" y1="21" x2="20" y2="16" />
					<line x1="20" y1="12" x2="20" y2="3" />
					<line x1="1" y1="14" x2="7" y2="14" />
					<line x1="9" y1="8" x2="15" y2="8" />
					<line x1="17" y1="16" x2="23" y2="16" />
				</svg>
			);
		case "home":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-home"
					{...props}
				>
					<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
			);
		case "user":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-user"
					{...props}
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
					<circle cx="12" cy="7" r="4" />
				</svg>
			);
		case "book":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-book"
					{...props}
				>
					<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
					<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
				</svg>
			);
		case "book-open":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-book-open"
					{...props}
				>
					<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
					<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
				</svg>
			);
		case "clipboard":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-clipboard"
					{...props}
				>
					<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
					<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
				</svg>
			);
		case "cpu":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-cpu"
					{...props}
				>
					<rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
					<rect x="9" y="9" width="6" height="6" />
					<line x1="9" y1="1" x2="9" y2="4" />
					<line x1="15" y1="1" x2="15" y2="4" />
					<line x1="9" y1="20" x2="9" y2="23" />
					<line x1="15" y1="20" x2="15" y2="23" />
					<line x1="20" y1="9" x2="23" y2="9" />
					<line x1="20" y1="14" x2="23" y2="14" />
					<line x1="1" y1="9" x2="4" y2="9" />
					<line x1="1" y1="14" x2="4" y2="14" />
				</svg>
			);
		case "link":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-link"
					{...props}
				>
					<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
				</svg>
			);
		case "link2":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-link-2"
					{...props}
				>
					<path d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
					<line x1="8" y1="12" x2="16" y2="12" />
				</svg>
			);
		case "external-link":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-external-link"
					{...props}
				>
					<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
			);
		case "github":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-github"
					{...props}
				>
					<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
				</svg>
			);
		case "twitter":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-twitter"
					{...props}
				>
					<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
				</svg>
			);
		case "hard-drive":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-hard-drive"
					{...props}
				>
					<line x1="22" y1="12" x2="2" y2="12" />
					<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
					<line x1="6" y1="16" x2="6.01" y2="16" />
					<line x1="10" y1="16" x2="10.01" y2="16" />
				</svg>
			);
		case "git-pull-request":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-git-pull-request"
					{...props}
				>
					<circle cx="18" cy="18" r="3" />
					<circle cx="6" cy="6" r="3" />
					<path d="M13 6h3a2 2 0 0 1 2 2v7" />
					<line x1="6" y1="9" x2="6" y2="21" />
				</svg>
			);
		case "coffee":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-coffee"
					{...props}
				>
					<path d="M18 8h1a4 4 0 0 1 0 8h-1" />
					<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
					<line x1="6" y1="1" x2="6" y2="4" />
					<line x1="10" y1="1" x2="10" y2="4" />
					<line x1="14" y1="1" x2="14" y2="4" />
				</svg>
			);
		case "square":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-square"
					{...props}
				>
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
				</svg>
			);
		case "check-square":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-check-square"
					{...props}
				>
					<polyline points="9 11 12 14 22 4" />
					<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
				</svg>
			);
		case "x-square":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-x-square"
					{...props}
				>
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
					<line x1="9" y1="9" x2="15" y2="15" />
					<line x1="15" y1="9" x2="9" y2="15" />
				</svg>
			);
		case "bell":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-bell"
					{...props}
				>
					<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
					<path d="M13.73 21a2 2 0 0 1-3.46 0" />
				</svg>
			);
		case "film":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-film"
					{...props}
				>
					<rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
					<line x1="7" y1="2" x2="7" y2="22" />
					<line x1="17" y1="2" x2="17" y2="22" />
					<line x1="2" y1="12" x2="22" y2="12" />
					<line x1="2" y1="7" x2="7" y2="7" />
					<line x1="2" y1="17" x2="7" y2="17" />
					<line x1="17" y1="17" x2="22" y2="17" />
					<line x1="17" y1="7" x2="22" y2="7" />
				</svg>
			);
		case "moon":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-moon"
					{...props}
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			);
		case "sun":
			return (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={width || 24}
					height={height || 24}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-sun"
					{...props}
				>
					<circle cx="12" cy="12" r="5" />
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</svg>
			);
	}
};

export { FeatherIcon };
