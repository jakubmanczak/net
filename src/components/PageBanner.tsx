import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

const PageBanner = (props: { headertext?: string; moretext?: string }) => {
  return (
    <>
      <div className="flex flex-col items-center pb-6 gap-1">
        <h1 className={`${lexend.className} text-4xl font-semibold mx-auto`}>
          {props.headertext || ""}
        </h1>
        <p className="text-center text-neutral-500">{props.moretext || ""}</p>
      </div>
      <hr className="mb-6 border-neutral-700" />
    </>
  );
};

export { PageBanner };
