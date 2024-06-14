import { Lexend } from "next/font/google";
import { GenericCard } from "./GenericCard";

const lexend = Lexend({ subsets: ["latin"] });

const ProjectSection = (props: { text?: string }) => {
  return (
    <>
      <div className="flex flex-row">
        <GenericCard />
      </div>
    </>
  );
};

export { ProjectSection };
