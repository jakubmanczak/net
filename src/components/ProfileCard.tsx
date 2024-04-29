"use client";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { IconTypescript } from "./icons/technologies/Typescript";
import { IconC } from "./icons/technologies/C";
import { IconGit } from "./icons/technologies/Git";
import { IconReact } from "./icons/technologies/React";

const lexend = Lexend({ subsets: ["latin"] });

const ProfileCard = (props: {
  img?: {
    path: string;
    alt: string;
  };
  cornericons?: boolean;
  bottomcaption?: string;
  indexno?: string;
}) => {
  return (
    <>
      <div
        className={`relative aspect-[52/72] w-52 h-72 rounded-md bg-neutral-800 select-none cursor-pointer shadow-lg overflow-hidden`}
      >
        {props.cornericons && (
          <>
            <div
              className={`flex flex-col gap-2 w-3 absolute text-xl z-30 top-3 left-3 rotate-0 text-neutral-500 mix-blend-plus-lighter`}
            >
              <IconC /> <IconGit /> <IconTypescript /> <IconReact />
            </div>
            <div
              className={`flex flex-col gap-2 w-3 absolute text-xl z-30  bottom-3 right-3 rotate-180 text-neutral-500 mix-blend-plus-lighter`}
            >
              <IconC /> <IconGit /> <IconTypescript /> <IconReact />
            </div>
          </>
        )}
        <div
          className={`absolute w-full h-full z-20 bg-opacity-60 bg-neutral-900 rounded-md flex flex-col items-center p-4 gap-2 border-neutral-600 border-[1px]`}
        >
          {props.img && (
            <Image
              src={props.img.path}
              alt={props.img.alt}
              width={96}
              height={96}
              className="rounded-full mt-2"
            />
          )}
          {/* {datasets[dataset].caption && (
            <p
              className={`${lexend.className} mt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-300 text-xl font-semibold -rotate-3`}
            >
              {"jakub mańczak"}
            </p>
          )} */}
          <p className="text-neutral-400 mt-auto w-full">
            {props.bottomcaption}
          </p>
          <p
            className={`absolute right-1 top-0 ${lexend.className} text-white opacity-[.2]`}
          >
            {props.indexno && `#${props.indexno}`}
          </p>
        </div>
        {props.img && (
          <Image
            src={props.img.path}
            alt="colorful backdrop for the card element"
            width={96}
            height={96}
            className="absolute z-10 top-0 left-0 w-full h-full blur object-cover rounded-md"
          />
        )}
      </div>
    </>
  );
};

export { ProfileCard };
