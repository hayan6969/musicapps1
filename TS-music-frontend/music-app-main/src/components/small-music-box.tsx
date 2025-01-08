import React, { useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { PlayIcon, CheckIcon } from "@heroicons/react/24/solid";

import { Checkbox } from "@material-tailwind/react";
interface CategoryCardProps {
  id: number;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
  pocketSize?: boolean | false;
  selectAble?: boolean | false;
}
interface ClickProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  // value: any;
}

function SmallMusicBox({
  id,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
  pocketSize,
  selectAble,
}: CategoryCardProps) {
  const [selected, setSelected] = React.useState(false);
  const handleClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(!selected);
  };
  return (
    <>
      {selectAble ? (
        <button className="" onClick={(e) => handleClick(e, id)}>
          <Card
            className={`relative grid ${
              pocketSize ? "max-h-[5rem] w-[12rem]" : "min-h-[5rem] w-[17rem]"
            } overflow-hidden hover:shadow-xl shadow-md border-2`}
          >
            <div
              className={`absolute inset-0 h-full w-full ${
                selected ? "" : "bg-white"
              }`}
            />
            <CardBody
              className={`relative flex flex-col justify-between ${
                pocketSize ? "p-2" : "p-3"
              }`}
            >
              <div className={`${pocketSize ? "" : "grid grid-cols-3"}`}>
                <div
                  className={`col-span-2 flex flex-col ${
                    pocketSize ? "gap-1" : "gap-2"
                  }`}
                >
                  {pocketSize ? (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-row items-center gap-2">
                          <Avatar
                            src={imgSong}
                            size="sm"
                            alt="avatar"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="black"
                              className="font-bold text-xs pt-1"
                            >
                              {singerName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="black"
                              className="text-[0.6rem]"
                            >
                              {songName}
                            </Typography>
                          </div>
                          {/* <IconButton
                            variant="gradient"
                            size="sm"
                            className="rounded-full h-6 w-6 shadow-none hover:shadow-xl ml-2"
                          >
                          </IconButton> */}
                          <PlayIcon className="h-4 w-4" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row gap-2">
                          <Avatar
                            src={imgSong}
                            alt="avatar"
                            variant="rounded"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="black"
                              className="font-bold text-xs pt-1"
                            >
                              {singerName}
                            </Typography>
                            <Typography
                              variant="small"
                              color="black"
                              className="font-bold text-[0.6rem] pt-[0.1rem]"
                            >
                              {songName}
                            </Typography>
                          </div>
                        </div>
                        {/* <div>
                  <IconButton
                    variant="gradient"
                    size="sm"
                    className="rounded-full shadow-none hover:shadow-xl"
                  >
                    <PlayIcon className="h-4 w-4" />
                  </IconButton>
                </div> */}
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-2">
                    {composerName ? (
                      <>
                        <Avatar src={imgComposer} alt="avatar" size="sm" />
                        <Typography variant="h6">{composerName}</Typography>
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal"
                        >
                          Composer
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="small"
                          color="black"
                          className={`mt-[0.2rem] ${
                            pocketSize ? "text-[0.6rem]" : "text-xs"
                          }`}
                        >
                          Composer for the song
                        </Typography>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <div className="flex flex-col">
                    {pocketSize ? (
                      ""
                    ) : (
                      <>
                        {/* <IconButton
                          variant="gradient"
                          size="sm"
                          className="rounded-full shadow-none hover:shadow-xl"
                        >
                        </IconButton> */}
                        <PlayIcon className="h-10 w-10" />
                      </>
                    )}
                  </div>
                  {selected ? (
                    <>
                      <div className=" absolute bottom-0 right-0 mx-[0.7rem]">
                        <CheckIcon className="w-8 h-8 font-bold" />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </button>
      ) : (
        <Card
          className={`relative grid ${
            pocketSize ? "max-h-[5rem] w-[12rem]" : "min-h-[5rem] w-[17rem]"
          } overflow-hidden hover:shadow-xl shadow-md border-2`}
        >
          <div className="absolute inset-0 h-full w-full bg-white" />
          <CardBody
            className={`relative bg-[url('/image/music-background/background-2.jpg')] bg-cover bg-no-repeat flex flex-col justify-between ${
              pocketSize ? "p-2" : "p-3"
            }`}
          >
            <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
            <div className={`${pocketSize ? "" : "grid grid-cols-3"}`}>
              <div
                className={`col-span-2 flex flex-col ${
                  pocketSize ? "gap-1" : "gap-2"
                }`}
              >
                {pocketSize ? (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-row items-center gap-2">
                        <Avatar
                          src={imgSong}
                          size="sm"
                          alt="avatar"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold text-xs pt-1"
                          >
                            {singerName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="black"
                            className="text-[0.6rem]"
                          >
                            {songName}
                          </Typography>
                        </div>
                        <PlayIcon className="h-6 w-6 ml-2 mt-4" color="black" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-row gap-2">
                        <Avatar
                          src={imgSong}
                          size="sm"
                          alt="avatar"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold text-xs pt-1"
                          >
                            {singerName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="black"
                            className="font-bold text-[0.6rem] pt-[0.1rem]"
                          >
                            {songName}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-2">
                  {composerName ? (
                    <>
                      <div className="flex flex-row items-center gap-1">
                        <Avatar src={imgComposer} alt="avatar" size="sm" />
                        <Typography
                          variant="small"
                          color="black"
                          className="text-[0.7rem]"
                        >
                          {composerName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="black"
                          className="font-normal text-[0.5rem] underline"
                        >
                          Composer
                        </Typography>
                      </div>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="small"
                        color="black"
                        className={`mt-[0.2rem] ${
                          pocketSize ? "text-[0.6rem]" : "text-xs"
                        }`}
                      >
                        Composer for the song
                      </Typography>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div className="flex flex-col">
                  {pocketSize ? (
                    ""
                  ) : (
                    <>
                      <PlayIcon
                        className="h-9 w-9 hover:scale-125"
                        color="black"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
}
export default SmallMusicBox;
