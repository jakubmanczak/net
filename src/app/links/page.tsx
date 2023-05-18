"use client";
import { IconBrandDiscord } from "@/components/Icons/Brands/IconDiscord";
import { IconBrandGithub } from "@/components/Icons/Brands/IconGitHub";
import { IconBrandGitlab } from "@/components/Icons/Brands/IconGitlab";
import { IconBrandLinkedIn } from "@/components/Icons/Brands/IconLinkedin";
import { IconBrandSpotify } from "@/components/Icons/Brands/IconSpotify";
import { IconBrandSteam } from "@/components/Icons/Brands/IconSteam";
import { IconBrandTwitter } from "@/components/Icons/Brands/IconTwitter";
import { IconExternalLink } from "@/components/Icons/IconExternalLink";
import { IconHeart } from "@/components/Icons/IconHeart";
import { IconLink } from "@/components/Icons/IconLink";
import Link from "next/link";

const links: {
  title: string;
  subtitle: string;
  value: string;
  type: "link" | "copy";
}[] = [
  {
    title: "GitHub",
    subtitle: "@jakubmanczak",
    value: "https://github.com/jakubmanczak",
    type: "link",
  },
  {
    title: "Discord",
    subtitle: "jamesen#1429",
    value: "jamesen#1429",
    type: "copy",
  },
  {
    title: "GitLab",
    subtitle: "@jakubmanczak",
    value: "https://gitlab.com/jakubmanczak",
    type: "link",
  },
  {
    title: "Twitter",
    subtitle: "@jamesennn",
    value: "https://twitter.com/jamesennn",
    type: "link",
  },
  {
    title: "Steam",
    subtitle: "/id/jakubmanczak",
    value: "https://steamcommunity.com/id/jakubmanczak",
    type: "link",
  },
  {
    title: "Spotify",
    subtitle: "Jakub Mańczak",
    value: "https://open.spotify.com/user/t9oxitgtv8ji36cfwxk23g1qq",
    type: "link",
  },
  {
    title: "LinkedIn",
    subtitle: "/in/jakubmanczak",
    value: "https://www.linkedin.com/in/jakubmanczak/",
    type: "link",
  },
  {
    title: "BeReal",
    subtitle: "jmsen",
    value: "jmsen",
    type: "copy",
  },
];

const getIcon = (icon: string) => {
  return icon === "GitHub" ? (
    <IconBrandGithub />
  ) : icon === "Twitter" ? (
    <IconBrandTwitter />
  ) : icon === "Steam" ? (
    <IconBrandSteam />
  ) : icon === "Spotify" ? (
    <IconBrandSpotify />
  ) : icon === "Discord" ? (
    <IconBrandDiscord />
  ) : icon === "GitLab" ? (
    <IconBrandGitlab />
  ) : icon === "LinkedIn" ? (
    <IconBrandLinkedIn />
  ) : (
    <IconHeart />
  );
};

export default function PageLinks() {
  const link = `
		flex flex-row p-2 items-center transition-all
		border rounded gap-4 w-[371px] text-left

		bg-gradient-to-r
		border-stone-300 hover:border-stone-400
		dark:border-stone-600 dark:hover:border-stone-500
		from-stone-50 to-stone-100 hover:from-stone-100 hover:to-stone-100
		dark:from-stone-900 dark:to-stone-800 dark:hover:from-stone-800 dark:hover:to-stone-800
	`;
  return (
    <>
      <div className="max-w-3xl mx-auto px-2 py-4">
        <h1 className="font-bold text-2xl">{"/links"}</h1>
        <p className="text-stone-500 dark:text-stone-400">
          {"Places to find me, virtually."}
        </p>
        {/*  */}
        <div className="flex flex-row flex-wrap flex-grow-0 gap-2 py-4 justify-between">
          {links.map((el) => {
            return (
              <>
                {el.type === "link" ? (
                  <Link href={el.value} target="_blank" className={link}>
                    <div className="self-start text-stone-400 dark:text-stone-500">
                      {getIcon(el.title)}
                    </div>
                    <div>
                      <h3 className="font-bold">{el.title}</h3>
                      <p className="text-stone-500 dark:text-stone-400">
                        {el.subtitle}
                      </p>
                    </div>
                    <div className="ml-auto text-stone-600 dark:text-stone-300">
                      <IconExternalLink />
                    </div>
                  </Link>
                ) : (
                  <button
                    className={link}
                    onClick={() => {
                      navigator.clipboard.writeText(el.value);
                    }}
                  >
                    <div className="self-start text-stone-400 dark:text-stone-500">
                      {getIcon(el.title)}
                    </div>
                    <div>
                      <h3 className="font-bold">{el.title}</h3>
                      <p className="text-stone-500 dark:text-stone-400">
                        {el.subtitle}
                      </p>
                    </div>
                    <div className="ml-auto text-stone-600 dark:text-stone-300">
                      <IconLink />
                    </div>
                  </button>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
