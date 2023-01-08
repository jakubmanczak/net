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
		| "cpu";
}

const FeatherIcon = ({ icon, width, height, ...props }: FeatherIconProps) => {
	switch (icon) {
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
	}
};

export { FeatherIcon };
