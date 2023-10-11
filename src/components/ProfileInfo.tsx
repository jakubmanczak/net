"use client";
import { Lexend } from "next/font/google";
import { useEffect, useRef, useState } from "react";

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
    <article className="flex flex-col justify-center max-w-[48ch]">
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
    </article>
  );
};

export { ProfileInfo };
