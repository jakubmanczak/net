import { IconCPU } from "@/components/icons/IconCPU";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export default function Projectspage() {
  return (
    <>
      <div className="mt-8 px-4 max-w-4xl w-full">
        <h1 className={`${lexend.className} flex flex-row gap-2 mb-2`}>
          <IconCPU />
          projects
        </h1>
        <p className="text-neutral-500 mb-8">
          {"Things I've made I'm proud of."}
        </p>
      </div>
    </>
  );
}
