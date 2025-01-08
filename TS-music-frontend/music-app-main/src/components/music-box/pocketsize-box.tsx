import React from "react";
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
function PocketsizeBox({
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
        className={`relative grid max-h-[5rem] w-[12rem] overflow-hidden hover:shadow-xl shadow-md border-2`}
      >
        <CardBody
          className={`relative bg-[url('/image/music-background/background-2.jpg')] bg-cover bg-no-repeat flex flex-col justify-between p-2`}
        >
          <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
          <div className={``}>
            <div className={`col-span-2 flex flex-col gap-1`}>
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
                      className={`mt-[0.2rem] text-[0.6rem]`}
                    >
                      Composer for the song
                    </Typography>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
export default PocketsizeBox;
