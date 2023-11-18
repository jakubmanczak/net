"use client";
import { Lexend } from "next/font/google";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { useState } from "react";
import { IconTypescript } from "./icons/technologies/Typescript";
import { IconC } from "./icons/technologies/C";
import { IconGit } from "./icons/technologies/Git";
import { IconReact } from "./icons/technologies/React";

const lexend = Lexend({ subsets: ["latin"] });

const datasets = [
  {
    img: "/weewoo.png",
    imgalt: "Picture of me holding my head, in police-headlight-like lighting",
    caption: "",
    bottomcaption: "2023",
    showfloaticons: true,
  },
  {
    img: "/album.png",
    imgalt: "Funky red-highlighted close-up of a pseudo-album image",
    caption: "",
    bottomcaption: "2022",
    showfloaticons: true,
  },
  {
    img: "/plane.png",
    imgalt: "sitting on a plane in a mask",
    caption: "",
    bottomcaption: "2022",
    showfloaticons: true,
  },
];

const ProfileCard = () => {
  const [dataset, setDataset] = useState<number>(0);
  const cardUpperClasses =
    "relative w-52 h-72 rounded-md bg-neutral-800 select-none cursor-pointer shadow-lg overflow-hidden";
  const cardLowerClasses =
    "absolute top-0 left-0 w-full h-full z-20 bg-opacity-60 bg-neutral-900 rounded-md flex flex-col items-center p-4 gap-2 border-neutral-600 border-[1px]";
  const floatingIconsClasses =
    "flex flex-col gap-2 w-3 absolute text-xl z-30 text-neutral-500";
  return (
    <>
      <div className="p-8 flex justify-center items-center">
        <Tilt scale={1.05} tiltMaxAngleX={7} tiltMaxAngleY={7}>
          <div
            className={cardUpperClasses}
            onClick={() =>
              setDataset(dataset == datasets.length - 1 ? 0 : dataset + 1)
            }
          >
            {datasets[dataset].showfloaticons ? (
              <>
                <div
                  className={`${floatingIconsClasses} top-3 left-3 rotate-0`}
                >
                  <IconC /> <IconGit /> <IconTypescript /> <IconReact />
                </div>
                <div
                  className={`${floatingIconsClasses} bottom-3 right-3 rotate-180`}
                >
                  <IconC /> <IconGit /> <IconTypescript /> <IconReact />
                </div>
              </>
            ) : (
              ""
            )}
            <div className={cardLowerClasses}>
              <Image
                src={datasets[dataset].img}
                alt={datasets[dataset].imgalt}
                width={96}
                height={96}
                className="rounded-full mt-2"
              />
              <p
                className={`--${lexend.className} text-neutral-400 --font-semibold`}
              >
                {datasets[dataset].caption}
              </p>
              <p className="text-neutral-400 mt-auto text-justify">
                {datasets[dataset].bottomcaption}
              </p>
            </div>
            <Image
              src={datasets[dataset].img}
              alt="colorful backdrop for the card element"
              width={96}
              height={96}
              className="absolute z-10 top-0 left-0 w-full h-full blur object-cover rounded-md"
            />
          </div>
        </Tilt>
      </div>
    </>
  );
};

export { ProfileCard };
