"use client";
import Image from "next/image";
import jakub from "../../public/jakub.png";
import { useEffect, useRef, useState } from "react";

export default function PageIndex() {
  const [splash, setSplash] = useState<string>("");
  const splashRef = useRef<HTMLParagraphElement>(null);

  const getSplash = (): void => {
    if (!splashRef.current) return;
    let prev = splash;
    splashRef.current.classList.remove("splashdone");
    fetch("https://api.manczak.net/splash?personal&games")
      .then((res) => {
        return res.ok ? res.text() : "splashed too hard!";
      })
      .then((data) => {
        if (data != prev) {
          setSplash(data);
          splashRef.current?.classList.add("splashdone");
        } else {
          getSplash();
        }
      })
      .catch((err) => {
        // console.log(err);
        setSplash("error caught.");
        splashRef.current?.classList.add("splashdone");
      });
  };

  const desc =
    "My name is Jakub Mańczak, people online call me jamesen and I'm learning IT at a High School in Poznań, Poland.";

  useEffect(() => getSplash(), []);
  return (
    <>
      <div className="max-w-3xl mx-auto pt-16 md:pt-36 text-center sm:text-justify px-2 flex flex-col-reverse items-center md:flex-row md:justify-between gap-8 md:gap-0">
        <div style={{ maxWidth: "50ch" }} className="md:text-lg flex flex-col">
          <h1 className="font-bold text-3xl">{"jakub mańczak"}</h1>
          <p
            ref={splashRef}
            className="cursor-pointer select-none opacity-0 transition-none w-full text-stone-500 dark:text-stone-400 -translate-y-5 pb-6"
            onClick={() => getSplash()}
          >
            {splash || "splash not loaded"}
          </p>
          <p className="mt-auto text-center sm:text-left">{desc}</p>
        </div>
        <Image
          src={jakub}
          alt="jakub mańczak"
          className="w-36 rounded-full shadow shadow-violet-200"
        />
        {/* <Image
          src={jakub}
          alt="jakub mańczak"
          className="w-36 z-20 rounded-full shadow shadow-violet-200 transition-all hover:rotate-12 cursor-pointer"
        />
        <div
          className={`
            relative flex flex-col w-full h-28 -ml-9 pl-14 z-10 rounded-xl my-auto
            bg-gradient-to-r from-stone-900 to-stone-800
            border border-stone-600 shadow p-2
          `}
        > */}
        {/* <h1 className="absolute left-11 -top-9 font-bold text-4xl">
            {"jakub mańczak"}
          </h1> */}
        {/* <p
            ref={splashRef}
            className="cursor-pointer select-none opacity-0 transition-none w-96 pb-4 text-stone-400 -translate-y-2"
            onClick={() => getSplash()}
          >
            {splash || "splash not loaded"}
          </p> */}
        {/* <h1 className="font-bold text-3xl">jakub mańczak</h1>
          <p style={{ maxWidth: "50ch" }} className="mt-auto">
            {desc}
          </p>
          <div className="absolute top-0 right-0 p-2 gap-3 flex flex-row text-stone-500">
            <button className="hover:text-stone-400">
              <IconTwitter />
            </button>
            <button className="hover:text-stone-400">
              <IconGithub />
            </button>
          </div>
          <div className="absolute bottom-0 right-0 p-2 text-stone-500">
            <button className="hover:underline hover:text-stone-400">
              external link
            </button>
          </div>
          <p
            ref={splashRef}
            className="absolute -bottom-6 left-4 cursor-pointer select-none opacity-0 transition-none text-stone-400 -translate-y-2 w-96"
            onClick={() => getSplash()}
          >
            {splash || "splashed too hard."}
          </p> */}
        {/* </div> */}
      </div>
    </>
  );
}
