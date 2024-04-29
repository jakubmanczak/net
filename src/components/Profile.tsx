"use client";
import Tilt from "react-parallax-tilt";
import { ProfileCard } from "./ProfileCard";
import { ProfileInfo } from "./ProfileInfo";
import { useState } from "react";

const datasets = [
  {
    img: {
      path: "/mow2024.png",
      alt: "me during an oxford debate championship",
    },
    bottomcaption: "MAR 2024",
  },
  {
    img: {
      path: "/weewoo.png",
      alt: "me holding my head in police-headlight-like lighting",
    },
    bottomcaption: "AUG 2023",
  },
  {
    img: {
      path: "/album.png",
      alt: "a red-highlighted close-up of a pseudo album cover",
    },
    bottomcaption: "NYE 2022",
  },
  {
    img: {
      path: "/plane.png",
      alt: "me sitting on a plane in a mask",
    },
    bottomcaption: "AUG 2022",
  },
];

const Profile = () => {
  const [dataset, setDataset] = useState<number>(0);
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-0 lg:gap-16">
        <div className="p-8 flex justify-center items-center">
          <div className="relative">
            <Tilt scale={1.03} tiltMaxAngleX={7} tiltMaxAngleY={7}>
              <span
                onClick={() =>
                  setDataset(dataset === datasets.length - 1 ? 0 : dataset + 1)
                }
              >
                <ProfileCard
                  img={datasets[dataset].img}
                  cornericons
                  bottomcaption={datasets[dataset].bottomcaption}
                  indexno={(dataset + 1).toString()}
                />
              </span>
            </Tilt>
            <div className="absolute top-0 left-0 -z-10 mt-3 ml-3 rotate-6">
              <ProfileCard
                img={datasets[(dataset + 1) % datasets.length].img}
                indexno={(((dataset + 1) % datasets.length) + 1).toString()}
              />
            </div>
            <div className="absolute top-0 left-0 -z-20 mt-6 ml-6 rotate-12">
              <ProfileCard
                img={datasets[(dataset + 2) % datasets.length].img}
                indexno={(((dataset + 2) % datasets.length) + 1).toString()}
              />
            </div>
          </div>
        </div>
        <ProfileInfo />
      </section>
    </>
  );
};

export { Profile };
