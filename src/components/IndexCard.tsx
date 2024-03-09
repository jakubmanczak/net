import { useState } from "react";
import Tilt from "react-parallax-tilt";

const datasets = [
  {
    img: "/weewoo.png",
    imgalt: "Picture of me holding my head, in police-headlight-like lighting",
    bottomcaption: "2023",
    showtechicons: true,
  },
  {
    img: "/album.png",
    imgalt: "Funky red-highlighted close-up of a pseudo-album",
    bottomcaption: "2022",
    showtechicons: true,
  },
  {
    img: "/plane.png",
    imgalt: "sitting on a plane in a mask",
    bottomcaption: "2022",
    showtechicons: true,
  },
];

const IndexCard = () => {
  const [datasetIndex, setDatasetIndex] = useState<number>(0);
  return (
    <div className="p-8 flex justify-center items-center">
      <Tilt scale={1.05} tiltMaxAngleX={7} tiltMaxAngleY={7}>
        <div
          className="relative w-52 h-72 cursor-pointer rounded-md bg-neutral-800 select-none shadow-lg overflow-hidden"
          onClick={() =>
            setDatasetIndex(
              datasetIndex === datasets.length - 1 ? 0 : datasetIndex + 1
            )
          }
        >
          <div className="absolute top-0 left-0 w-full h-full z-20 bg-opacity-60 bg-neutral-900 rounded-md flex flex-col items-center p-4 gap-2 border-neutral-600 border">
            <img
              src={datasets[datasetIndex].img}
              alt={datasets[datasetIndex].imgalt}
              className="rounded-full mt-2 w-24"
            />
            <p className="absolute bottom-0 pb-4 text-neutral-400">
              {datasets[datasetIndex].bottomcaption}
            </p>
          </div>
          <img
            src={datasets[datasetIndex].img}
            alt="backdrop"
            className="absolute z-10 top-0 left-0 w-full h-full blur object-cover rounded-md"
          />
        </div>
      </Tilt>
    </div>
  );
};

export { IndexCard };
