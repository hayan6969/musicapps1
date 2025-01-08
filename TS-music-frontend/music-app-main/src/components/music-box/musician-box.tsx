"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";
import { users } from "../../dummy/users";
import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import ReactionBox from "../reaction/reaction-box";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  musicAssets,
  musicPlayerDialog,
  musicCreation,
  setSelectedId,
} from "@/redux/features/offer/offerSlice";
interface CategoryCardProps {
  id: string;
  imgSong: string;
  singerName: string;
  songName: string;
  composerId: number;
  withName?: boolean;
  withBottom?: boolean;
  isMusicAsset?: boolean;
  haveAction?: boolean;
  musicStyle: string;
  tags: string[];
  source?: "assets" | "home";
}

function MusicianBox({
  id,
  imgSong,
  singerName,
  songName,
  composerId,
  withName = true,
  withBottom = true,
  isMusicAsset = false,
  haveAction = false,
  musicStyle,
  tags,
  source = "home",
}: CategoryCardProps) {
  const composer = users.find((user) => user.id === composerId);
  const dispatch = useDispatch<AppDispatch>();
  const isMusicPlayerDialog = useSelector(
    (state: RootState) => state.offer.musicPlayerDialog
  );
  const [removeClass, setRemoveClass] = useState(false);

  const handleClick = () => {
    if (!id) {
      console.error("No ID provided for music box");
      return;
    }

    console.log("Clicked on music box with source:", source, "ID:", id);

    // Reset states first
    dispatch(musicAssets(false));
    dispatch(setSelectedId(null));

    // Set the ID and appropriate state based on source
    if (source === "assets") {
      dispatch(setSelectedId(id));
      dispatch(musicAssets(true)); // This indicates we should use music-asset endpoint
    } else {
      dispatch(setSelectedId(id));
      dispatch(musicAssets(false)); // This indicates we should use music-creation endpoint
    }

    dispatch(musicPlayerDialog());
  };

  const handleMouseEnter = () => {
    if (haveAction) {
      console.log("Mouse entered:", songName);
      setRemoveClass(true);
    }
  };

  const handleMouseLeave = () => {
    if (haveAction) {
      console.log("Mouse left:", songName);
      setRemoveClass(false);
    }
  };

  return (
    <>
      <div className="">
        <Card
          className={`relative grid min-h-[5rem] cursor-pointer w-[19.4rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <CardBody className={`relative flex flex-col justify-center p-3`}>
            <div className={``}>
              <div className={`flex flex-col gap-2`}>
                {/* <div className="flex justify-center items-center gap-2">
              </div> */}
                <div className="flex justify-center items-center flex-row gap-2">
                  <Avatar
                    src={imgSong || "/image/default-picture.jpg"}
                    size="md"
                    alt={songName || "Music"}
                    variant="rounded"
                    onError={(e: any) => {
                      e.target.src = "/image/default-picture.jpg";
                    }}
                  />
                  <div className="w-[12rem] max-w-[12rem]">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-bold text-[0.9rem]"
                    >
                      {songName}
                    </Typography>
                    <div className="flex flex-row justify-between gap-[0.2rem]">
                      <div className="flex flex-row gap-[0.2rem]">
                        <Typography
                          variant="small"
                          color="black"
                          className="font-bold text-xs"
                        >
                          {singerName}
                        </Typography>
                        <p className="text-[0.6rem] pt-1 font-semibold text-black">
                          Singer
                        </p>
                      </div>
                    </div>
                  </div>
                  <PlayIcon
                    className="h-9 w-9 mr-5 cursor-pointer hover:scale-125"
                    color="black"
                  />
                </div>
                <div
                  className={`${
                    removeClass ? "" : "invisible"
                  } group absolute top-1 right-1 cursor-pointer`}
                >
                  <EllipsisVerticalIcon className="menu-hover h-[1.6rem] cursor-pointer hover:bg-gray-200 group-hover:bg-gray-200 group-hover:rounded-full hover:rounded-full text-black" />
                  <div className="invisible z-50 absolute group-hover:visible bg-white divide-gray-100 rounded-lg shadow w-[6rem] top-5 right-0 dark:bg-gray-700">
                    <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                      Edit
                    </a>
                    <a className="block px-2 py-2 hover:bg-gray-100 text-red-500 text-xs font-semibold tracking-wider">
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
          <div className="flex justify-between p-2 items-center">
            <p className="text-sm">{musicStyle}</p>
            <div className="flex gap-1.5">
              {tags.map((t, index) => (
                <p
                  key={index}
                  className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-sm"
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
          {/* <div className="flex flex-col border-t-2 mx-3 h-[3rem] max-h-[3rem] justify-center gap-1">
            <div className="flex flex-row gap-20">
              <p className="text-[0.6rem] font-bold text-black">Music Style:</p> */}
          {/* <p className="text-[0.6rem] font-bold text-black">
                Culture Area:
              </p> */}
          {/* </div> */}
          {/* <div className="flex flex-row justify-between">
              <p className="text-[0.6rem] font-bold text-black">label:</p>
            </div> */}
          {/* </div> */}
        </Card>
        {withBottom ? (
          <div className="flex flex-row gap-1 h-[3rem] max-h-[3rem] py-2 pl-1 justify-between items-center">
            {withName ? (
              <>
                <div className="flex flex-row gap-2 items-center">
                  <Avatar
                    src={composer?.avatar || "/image/default-picture.jpg"}
                    size="xs"
                    alt={composer?.userName || "Composer"}
                    variant="circular"
                    onError={(e: any) => {
                      e.target.src = "/image/default-picture.jpg";
                    }}
                  />
                  <div className="flex flex-col max-h-[3rem] max-w-[12rem] pt-1">
                    <p className="text-xs text-black font-bold">
                      {composer?.userName || "Unknown Composer"}
                    </p>
                    <div className="flex flex-row gap-[0.2rem] max-h-[3rem] max-w-[12rem]">
                      <p className="text-[0.5rem] text-black font-bold">
                        Composer, Lyricist, Arranger
                      </p>
                      <p className="text-[0.4rem] pt-1 text-black font-bold">
                        For the Music
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-row justify-center items-center gap-[0.2rem] max-h-[3rem] max-w-[12rem]">
                  <p className="text-[0.5rem] text-black font-bold">
                    Composer, Lyricist, Arranger
                  </p>
                  <p className="text-[0.4rem] pt-2 text-black font-bold">
                    For the Music
                  </p>
                </div>
              </>
            )}
            <ReactionBox withSale={true} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
export default MusicianBox;
