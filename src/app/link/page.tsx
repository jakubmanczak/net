"use client";
import { PageBanner } from "@/components/PageBanner";
import { IconExternalLink } from "@/components/icons/IconExternalLink";
import { IconLink } from "@/components/icons/IconLink";
import { IconBrandDiscord } from "@/components/icons/brands/discord";
import { IconBrandGithub } from "@/components/icons/brands/github";
import { IconBrandGitlab } from "@/components/icons/brands/gitlab";
import { IconBrandLinkedIn } from "@/components/icons/brands/linkedin";
import { IconBrandSpotify } from "@/components/icons/brands/spotify";
import { IconBrandSteam } from "@/components/icons/brands/steam";
import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ subsets: ["latin"] });
const boldfont = lexend.className;

type linktype = {
  linkname: string;
  linkhref?: string;
  linkcopy?: string;
  linkdesc?: string;
  linkicon?: () => React.JSX.Element;
};

const links: linktype[] = [
  {
    linkname: "GitHub",
    linkdesc: "@jakubmanczak",
    linkhref: "https://github.com/jakubmanczak",
    linkicon: IconBrandGithub,
  },
  {
    linkname: "Discord",
    linkdesc: "@jamesen",
    linkcopy: "jamesen",
    linkicon: IconBrandDiscord,
  },
  {
    linkname: "GitLab",
    linkdesc: "@jakubmanczak",
    linkhref: "https://gitlab.com/jakubmanczak",
    linkicon: IconBrandGitlab,
  },
  {
    linkname: "Steam",
    linkdesc: "/id/jakubmanczak",
    linkhref: "https://steamcommunity.com/id/jakubmanczak",
    linkicon: IconBrandSteam,
  },
  {
    linkname: "Spotify",
    linkdesc: "Jakub Mańczak",
    linkhref: "https://open.spotify.com/user/t9oxitgtv8ji36cfwxk23g1qq",
    linkicon: IconBrandSpotify,
  },
  {
    linkname: "LinkedIn",
    linkdesc: "/in/jakubmanczak",
    linkhref: "https://www.linkedin.com/in/jakubmanczak/",
    linkicon: IconBrandLinkedIn,
  },
];

const LinkCard = (props: linktype) => {
  const InnerCard = (
    <div className="p-2 flex flex-ro gap-2 rounded border-[1px] bg-neutral-800 border-neutral-700 transition hover:bg-neutral-900 hover:cursor-pointer">
      <div className="text-neutral-500">
        {props.linkicon ? props.linkicon() : ""}
      </div>
      <div className="p-1">
        <p className={`${boldfont}`}>{props.linkname}</p>
        <p className={`${boldfont} text-neutral-500`}>{props.linkdesc}</p>
      </div>
      <div className="ml-auto text-neutral-500">
        {props.linkcopy ? <IconLink /> : <IconExternalLink />}
      </div>
    </div>
  );
  return props.linkhref ? (
    <Link href={props.linkhref} target="_blank">
      {InnerCard}
    </Link>
  ) : (
    <div
      tabIndex={0}
      onClick={() => {
        if (!props.linkcopy) return;
        navigator.clipboard.writeText(props.linkcopy);
      }}
    >
      {InnerCard}
    </div>
  );
};

export default function LinksPage() {
  return (
    <>
      <div className="mt-8 px-4 max-w-4xl w-full">
        <PageBanner headertext="links" />
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((el) => {
            return (
              <LinkCard
                linkname={el.linkname}
                linkicon={el.linkicon}
                linkcopy={el.linkcopy}
                linkdesc={el.linkdesc}
                linkhref={el.linkhref}
                key={el.linkname}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
