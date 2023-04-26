export default function PageIndex() {
	return (
		<>
			<div className="flex flex-row justify-center gap-12 rounded mx-4 mt-32 p-4 text-center">
				<div className="flex flex-col justify-center text-left">
					<h1 className="text-2xl font-bold">jakub mańczak</h1>
					<p className="text-gray-500 mb-3">stubborn and brittle</p>
					<p style={{ maxWidth: "42ch" }}>
						My name is Jakub Mańczak, people online call me jamesen and I'm
						learning IT at a High School in Poznań, Poland.
					</p>
				</div>
				<div>
					<img
						src="morasko.png"
						alt="jakub mańczak"
						className="h-36 rounded-full border-2 border-transparent transition-all hover:rotate-12 hover:cursor-pointer hover:border-violet-400"
					/>
				</div>
			</div>
			<div className="flex flex-row justify-center gap-4">
				<button className="rounded w-24 bg-gray-800 px-6 py-1 border-2 border-transparent hover:border-violet-700">
					kill
				</button>
				<button className="rounded w-24 bg-gray-800 px-6 py-1 border-2 border-transparent hover:border-violet-700">
					spare
				</button>
			</div>
		</>
	);
}
