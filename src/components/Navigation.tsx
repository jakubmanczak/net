"use client";
import Link from "next/link";
import { IconLink } from "./Icons/IconLink";
import { IconHome } from "./Icons/IconHome";
import { IconCPU } from "./Icons/IconCPU";
import { useTheme } from "next-themes";
import { IconMonitor } from "./Icons/IconMonitor";
import { IconSun } from "./Icons/IconSun";
import { IconMoon } from "./Icons/IconMoon";
import { IconMeh } from "./Icons/IconMeh";
import { useEffect, useState } from "react";

const Navigation = () => {
  const navlink = `
		p-2 rounded flex flex-row gap-2 border transition-all
		first-of-type:rounded-tl-[32px] first-of-type:rounded-bl-[32px]
		last-of-type:rounded-tr-[32px] last-of-type:rounded-br-[32px]
    first-of-type:pl-4 last-of-type:pr-4

		border-stone-300 bg-stone-100
		hover:border-stone-400 hover:bg-stone-200
		dark:border-stone-600 dark:bg-stone-800
		dark:hover:border-stone-500 dark:hover:bg-stone-700
	`;
  const themebtn = `
		p-2 rounded-full border ml-auto transition-all
		
		border-stone-300 bg-stone-100
		hover:border-stone-400 hover:bg-stone-200
		dark:border-stone-600 dark:bg-stone-800
		dark:hover:border-stone-500 dark:hover:bg-stone-700
	`;

  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto px-2 py-4 flex flex-row flex-grow gap-2">
        <Link className={navlink} href="/">
          <div className="scale-75">
            <IconHome />
          </div>
          {"home"}
        </Link>
        <Link className={navlink} href="/projects">
          <div className="scale-75">
            <IconCPU />
          </div>
          {"projects"}
        </Link>
        <Link className={navlink} href="/links">
          <div className="scale-75">
            <IconLink />
          </div>
          {"links"}
        </Link>
        <button
          className={themebtn}
          onClick={() => {
            if (theme === "system") setTheme("light");
            else if (theme === "light") setTheme("dark");
            else if (theme === "dark") setTheme("system");
            else setTheme("system");
          }}
        >
          <div className="scale-75">
            {mounted ? (
              theme === "light" ? (
                <IconSun />
              ) : theme === "dark" ? (
                <IconMoon />
              ) : theme === "system" ? (
                <div className="relative">
                  <IconMonitor />
                  {/* <div className="absolute scale-50 -top-[2px] left-0"> */}
                  {/* {resolvedTheme === "dark" ? <IconMoon /> : <IconSun />} */}
                  {/* </div> */}
                </div>
              ) : (
                <IconMeh />
              )
            ) : (
              <div className="w-6 h-6 rounded-lg bg-stone-500 animate-pulse"></div>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export { Navigation };
