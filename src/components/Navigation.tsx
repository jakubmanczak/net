import Link from "next/link";
import { IconHome } from "./icons/IconHome";
import { IconCPU } from "./icons/IconCPU";
import { IconHeart } from "./icons/IconHeart";
import { IconSliders } from "./icons/IconSliders";
import { IconArchive } from "./icons/IconArchive";

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
          <div className={`${base} rounded-full`}>
            <div className="scale-75">
              <IconHeart />
            </div>
          </div>
          <div className={`${base} rounded-full`}>
            <div className="scale-75">
              <IconSliders />
            </div>
          </div>
          <div className={`${base} rounded-full`}>
            <div className="w-6 h-6 scale-75 rounded-lg bg-stone-500 animate-pulse" />
          </div>
        </div>
      </div>
    </>
  );
};

export { Navigation };
