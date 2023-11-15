"use client";
import { Lexend } from "next/font/google";
import Image from "next/image";
import { MouseEvent, useRef, useState } from "react";

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
  const [doMouseShift, setDoMouseShift] = useState<boolean>(false);
  const [bounds, setBounds] = useState<DOMRect | null>(null);
  const refHover = useRef<HTMLDivElement>(null);
  const shiftToMouse = (e: MouseEvent) => {
    if (!doMouseShift || !bounds || !refHover.current) return;
    const x = e.clientX;
    const y = e.clientY;
    const left = x - bounds.x;
    const top = y - bounds.y;
    const center = {
      x: left - bounds.width / 2,
      y: top - bounds.height / 2,
    };
    const distance = Math.sqrt(Math.pow(center.x, 2) + Math.pow(center.y, 2));
    refHover.current.style.transform = `
      scale3d(1.15, 1.15, 1.15) 
      rotate3d(
        ${center.y / 10},
        ${-center.x / 10},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;
  };
  const removeMouseShift = (e: MouseEvent) => {
    if (!refHover.current) return;
    setDoMouseShift(false);
    refHover.current.style.transform = "";
    refHover.current.style.background = "";
  };
  const addMouseShift = (e: MouseEvent) => {
    if (!refHover.current) return;
    setBounds(refHover.current.getBoundingClientRect());
    setDoMouseShift(true);
  };
  return (
    <>
      <div className="p-8 flex justify-center items-center">
        <div
          className={`
            relative w-52 h-72
            rounded-md bg-neutral-800 
            select-none cursor-pointer
            shadow-lg hover:shadow-2xl
          `}
          style={{
            transitionDuration: "150ms",
            transitionProperty: "transform, box-shadow",
            transitionTimingFunction: "ease-out",
            transform: "rotate3d(0)",
          }}
          onClick={() =>
            setDataset(dataset == datasets.length - 1 ? 0 : dataset + 1)
          }
          ref={refHover}
          // onMouseMove={shiftToMouse}
          // onMouseEnter={addMouseShift}
          // onMouseLeave={removeMouseShift}
        >
          <div
            className={`
              absolute top-0 left-0 w-full h-full z-20
              bg-opacity-60 bg-neutral-900 backdrop-blur rounded-md
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
            className="absolute z-10 top-0 left-0 w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </>
  );
};

export { ProfileCard };
