import React, { useEffect } from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

import { PlayIcon } from "@heroicons/react/24/solid";
interface CategoryCardProps {
  id: number;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
}

function OriginalBox({
  id,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
}: CategoryCardProps) {
  return (
    <>
      <Card
        className={`relative grid min-h-[5rem] w-[17rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md`}
      >
        <CardBody
          className={`relative bg-[url('/image/music-background/background-2.jpg')] bg-cover bg-no-repeat flex flex-col justify-between p-3`}
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
          <div className={`grid grid-cols-3`}>
            <div className={`col-span-2 flex flex-col gap-2`}>
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
                      className={`mt-[0.2rem] text-xs`}
                    >
                      Composer for the song
                    </Typography>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center">
              <div className="flex flex-col">
                <PlayIcon className="h-9 w-9 hover:scale-125" color="black" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
export default OriginalBox;
