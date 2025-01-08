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
function ProfileSuggestBox({
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
        className={`relative grid max-h-[4rem] w-[9.8rem] overflow-hidden hover:shadow-xl shadow-md border-2`}
      >
        <CardBody className={`relative flex flex-col justify-between p-2`}>
          <div className="absolute inset-0 h-full w-full" />
          <div className={``}>
            <div className={`col-span-2 flex flex-col gap-1`}>
              <div className="flex justify-between gap-1">
                <div className="flex flex-row">
                  <div className="flex flex-col w-[1.7rem]">
                    <Avatar
                      src={imgSong}
                      size="xs"
                      alt="avatar"
                      variant="square"
                    />
                    <div></div>
                  </div>
                  <div className="w-[4rem]">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-bold text-[0.7rem]"
                    >
                      {singerName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="black"
                      className="text-[0.4rem]"
                    >
                      {songName}
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <PlayIcon className="h-6 w-6 ml-6 mt-2" color="black" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Typography
                  variant="small"
                  color="black"
                  className={`text-[0.5rem] font-bold ml-1`}
                >
                  Composer for the song
                </Typography>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
export default ProfileSuggestBox;
