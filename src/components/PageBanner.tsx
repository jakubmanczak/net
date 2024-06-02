import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

const PageBanner = (props: { headertext: string }) => {
  return (
    <>
      <div className="flex flex-col items-center gap-1 bg-cpu pb-6">
        <h1 className={`${lexend.className} text-4xl font-semibold mx-auto`}>
          {props.headertext}
        </h1>
        {/* <p className="flex flex-row gap-3 ---pt-2 text-neutral-500">
          like, finished ones
        </p> */}
      </div>
      <hr className="mb-6 border-neutral-700" />
    </>
  );
};

export { PageBanner };
