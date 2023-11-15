import { IconCPU } from "@/components/icons/IconCPU";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function Projectspage() {
  return (
    <>
      <div className="mt-8 p-4 lg:mt-24 max-w-4xl w-full">
        <h1 className={`${lexend.className} flex flex-row gap-2 mb-2`}>
          <IconCPU />
          projects
        </h1>
        <p className="text-neutral-500">Projects will be shown here.</p>
      </div>
    </>
  );
}
