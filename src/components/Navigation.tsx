"use client";
import Link from "next/link";
import { IconHome } from "./icons/IconHome";
import { IconCPU } from "./icons/IconCPU";
import { IconHeart } from "./icons/IconHeart";
import { IconSliders } from "./icons/IconSliders";
import { IconArchive } from "./icons/IconArchive";
import { IconHeartFill } from "./icons/IconHeartFill";
import { useEffect, useState } from "react";

type navlink = {
  title: string;
  href: string;
  icon: () => React.JSX.Element;
};

const navlinks: navlink[] = [
  {
    title: "home",
    href: "/",
    icon: IconHome,
  },
  {
    title: "projects",
    href: "/projects",
    icon: IconCPU,
  },
  {
    title: "links",
    href: "/links",
    icon: IconArchive,
  },
];

const Navigation = () => {
  const [liked, setLiked] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    if (!window) return;
    setLiked(window.localStorage.getItem("liked") === "1" ? true : false);
    setMounted(true);
  }, []);
  const base =
    "p-2 flex flex-row gap-2 border-[1px] bg-neutral-800 border-neutral-700 transition hover:bg-neutral-900 hover:cursor-pointer";
  return (
    <>
      <div className="flex flex-row gap-1 p-4 max-w-4xl w-full">
        {navlinks.map((el, index) => {
          return (
            <Link key={el.href} href={el.href}>
              <div
                className={`${base} rounded ${
                  index == 0
                    ? "pl-3 md:pl-4 rounded rounded-l-[24px]"
                    : index == navlinks.length - 1
                    ? "pr-3 md:pr-4 rounded rounded-r-[24px]"
                    : "rounded"
                }`}
              >
                <div className="scale-75">{el.icon()}</div>
                <p className="hidden md:block">{el.title}</p>
              </div>
            </Link>
          );
        })}
        <div className="ml-auto flex flex-row gap-2">
          <button
            className={`${base} rounded-full`}
            onClick={() => {
              setLiked(!liked);
              if (!window) return;
              window.localStorage.setItem("liked", !liked ? "1" : "0");
            }}
          >
            <div className="scale-75">
              {mounted ? (
                liked ? (
                  <IconHeartFill />
                ) : (
                  <IconHeart />
                )
              ) : (
                <div className="w-6 h-6 bg-neutral-500 animate-pulse rounded-lg" />
              )}
            </div>
          </button>
          {/* <button className={`${base} rounded-full`}>
              <div className="scale-75">
                <IconSliders />
              </div>
            </button> */}
          {/* <button className={`${base} rounded-full`}>
            <div className="w-6 h-6 scale-75 rounded-lg bg-stone-500 animate-pulse" />
          </button> */}
        </div>
      </div>
    </>
  );
};

export { Navigation };
