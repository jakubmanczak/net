"use client";
import { Lexend } from "next/font/google";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

const lexend = Lexend({ subsets: ["latin"] });

const datasets = [
  {
    img: "/weewoo.png",
    imgalt: "Picture of me holding my head, in police-headlight-like lighting",
    bigtext: "",
    caption: "August 2023",
  },
  {
    img: "/album.png",
    imgalt: "Funky red-highlighted close-up of a pseudo-album image",
    bigtext: "",
    caption: "December 2022",
  },
  {
    img: "/plane.png",
    imgalt: "sitting on a plane in a mask",
    bigtext: "",
    caption: "August 2022",
  },
];

const ProfileCard = () => {
  const [dataset, setDataset] = useState<number>(0);
  return (
    <>
      <div className="p-8 flex justify-center items-center">
        <Tilt scale={1.05} tiltMaxAngleX={7} tiltMaxAngleY={7}>
          <div
            className={`
            relative w-52 h-72
            rounded-md bg-neutral-800 
            select-none cursor-pointer
            shadow-lg overflow-hidden
          `}
            onClick={() =>
              setDataset(dataset == datasets.length - 1 ? 0 : dataset + 1)
            }
          >
            <div
              className={`
              absolute top-0 left-0 w-full h-full z-20
              bg-opacity-60 bg-neutral-900 rounded-md
              flex flex-col items-center p-4 gap-2 border-neutral-600
            `}
              style={{
                borderWidth: 1,
              }}
            >
              <Image
                src={datasets[dataset].img}
                alt={datasets[dataset].imgalt}
                width={96}
                height={96}
                className="rounded-full"
              />
              <h1 className={`${lexend.className} font-semibold`}>
                {datasets[dataset].bigtext}
              </h1>
              <p className="text-neutral-400 mt-auto text-justify">
                {datasets[dataset].caption}
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
