"use client";
import Link from "next/link";
import { IconHome } from "./icons/IconHome";
import { IconCPU } from "./icons/IconCPU";
import { IconAtSign } from "./icons/IconAtSign";
import { usePathname } from "next/navigation";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

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
    href: "/link",
    icon: IconAtSign,
  },
];

const Navigation = () => {
  const path = usePathname();
  return (
    <>
      <div className="flex flex-row justify-center sm:justify-normal gap-8 sm:gap-4 p-4 max-w-4xl w-full">
        <Link
          href="/"
          className={`mr-auto hidden sm:block ${lexend.className}`}
        >
          <p>manczak.net</p>
        </Link>
        {navlinks.map((el, index) => {
          return (
            <Link
              key={index}
              href={el.href}
              className={`
                underline-offset-4 decoration-neutral-600
                ${path && el.href === path && "underline"}
              `}
            >
              <p className="hidden sm:block">{el.title}</p>
              <div
                className={`
                  sm:hidden transition-colors text-neutral-700
                  ${path && el.href === path && "text-white"}
                `}
              >
                {el.icon()}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export { Navigation };
