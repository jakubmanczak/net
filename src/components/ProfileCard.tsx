"use client";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { IconTypescript } from "./icons/technologies/Typescript";
import { IconC } from "./icons/technologies/C";
import { IconGit } from "./icons/technologies/Git";
import { IconReact } from "./icons/technologies/React";
import { HTMLAttributes, HTMLProps } from "react";

const lexend = Lexend({ subsets: ["latin"] });

type profilecardpropstype = {
  cardprops: {
    img?: {
      path: string;
      alt: string;
    };
    showcornericons?: boolean;
    bottomcaption?: string;
    indexno?: string;
  };
} & HTMLAttributes<HTMLDivElement>;

const ProfileCard = ({ cardprops, ...props }: profilecardpropstype) => {
  return (
    <>
      <div
        className={`relative aspect-[52/72] w-52 h-72 rounded-md bg-neutral-800 select-none cursor-pointer shadow-lg overflow-hidden`}
        {...props}
      >
        {cardprops.showcornericons && (
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
          {cardprops.img && (
            <Image
              src={cardprops.img.path}
              alt={cardprops.img.alt}
              width={96}
              height={96}
              className="rounded-full mt-2"
            />
          )}
          <p className="text-neutral-400 mt-auto w-full">
            {cardprops.bottomcaption}
          </p>
          <p
            className={`absolute right-1 top-0 ${lexend.className} text-white opacity-[.2]`}
          >
            {cardprops.indexno && `#${cardprops.indexno}`}
          </p>
        </div>
        {cardprops.img && (
          <Image
            src={cardprops.img.path}
            alt="card element backdrop"
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
