"use client";
import { Lexend } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconCPU } from "./icons/IconCPU";
import { IconHome } from "./icons/IconHome";
import { IconLink } from "./icons/IconLink";

const lexend = Lexend({ subsets: ["latin"] });

const ProfileInfo = () => {
  const [splash, setSplash] = useState<string | null>(null);
  const refSplash = useRef<HTMLParagraphElement>(null);

  const fetchSplash = () => {
    refSplash.current?.classList.add(
      "opacity-0",
      "transition-none",
      "-translate-y-5"
    );
    fetch("https://api.manczak.net/splash")
      .then((res) => {
        return res.ok ? res.text() : "splash fetch failed";
      })
      .then((text) => {
        setSplash(text);
        refSplash.current?.classList.remove(
          "opacity-0",
          "transition-none",
          "-translate-y-5"
        );
        refSplash.current?.classList.add("transition-all");
      });
  };

  useEffect(() => fetchSplash(), []);
  return (
    <article className="flex flex-col justify-center p-4 lg:p-0 text-center lg:text-left max-w-[48ch]">
      <h1 className={`${lexend.className} text-3xl font-semibold`}>
        jakub mańczak
      </h1>
      <div
        onClick={() => fetchSplash()}
        className={`${lexend.className} text-neutral-500 pb-4 cursor-pointer select-none`}
      >
        <p
          id="splash"
          ref={refSplash}
          className="opacity-0 transition-none -translate-y-5"
        >
          {splash || "..."}
        </p>
      </div>
      <p>
        {
          "My name is Jakub Mańczak, people online call me jamesen and I'm learning IT in Poznań, Poland."
        }
      </p>
      <div className="flex flex-row gap-2 pt-4">
        {/* {[
          {
            name: "projects",
            href: "/projects",
            icon: IconCPU,
          },
          {
            name: "links",
            href: "/links",
            icon: IconLink,
          },
        ].map((el) => {
          // return <></>;
          return (
            <Link
              href={el.href}
              key={el.href}
              className={`flex flex-row gap-2 py-3 px-4 rounded-md text-neutral-500 transition ${lexend.className} hover:text-neutral-100 hover:bg-neutral-800`}
            >
              {el.icon()}
              <p>{el.name}</p>
            </Link>
          );
        })} */}
      </div>
    </article>
  );
};

export { ProfileInfo };
