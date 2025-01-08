import React, { useEffect } from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { SUGGESTED_PROFILE_MUSIC } from "@/default/profile-box-music";
import ProfileSuggestBox from "../music-box/profile-suggest-box";
interface CategoryCardProps {
  id: number;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
  withName?: boolean;
}

function ProfileBox({
  id,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
  withName = true,
}: CategoryCardProps) {
  return (
    <>
      <div className="">
        <Card
          className={`relative grid min-h-[5rem] w-[21rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md`}
        >
          <CardBody
            className={`relative bg-[url('/image/music-background/background-2.jpg')] bg-cover h-[3rem] bg-no-repeat flex flex-col justify-center p-3`}
          >
            <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
            <div className={``}>
              <div className={`flex flex-col gap-2`}>
                <div className="flex justify-center items-center flex-row gap-2 absolute top-3">
                  <Avatar
                    src={imgSong}
                    size="md"
                    alt="avatar"
                    variant="circular"
                  />
                  <div className="flex flex-row gap-2 mb-2">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-bold text-[0.9rem]"
                    >
                      {"Jack Cole"}
                    </Typography>
                    <span className=" text-white text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div className="flex flex-col ml-[4.3rem] mt-1 gap-0">
                <p className="text-[0.6rem] font-bold text-black">
                  Composer at A studio
                </p>
                <p className="text-[0.6rem] font-bold text-black">following</p>
              </div>
              <div className="flex flex-col ml-[4.3rem] mt-1 gap-0">
                <p className="text-[0.6rem] font-bold text-black">
                  Los Angeles, USA
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-1 h-[5rem] max-h-[5rem] justify-center items-end pb-2">
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_PROFILE_MUSIC.map((props, key) => (
                  <ProfileSuggestBox key={key} {...props} />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
export default ProfileBox;
