export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 px-4 max-w-4xl mx-auto w-full text-justify">
      {children}
    </div>
  );
}
