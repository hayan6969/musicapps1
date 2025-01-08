"use client";
import React from "react";
import { Card, CardBody, Avatar } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  musicPlayerDialog,
  setMusicAssetId,
} from "@/redux/features/offer/offerSlice";

interface AssetMusicianBoxProps {
  id: string;
  imgSong: string;
  musicName: string;
  musicStyle: string;
  tags: string[];
}

function AssetMusicianBox({
  id,
  imgSong,
  musicName,
  musicStyle,
  tags,
}: AssetMusicianBoxProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    if (!id) return;
    console.log("Clicked on asset music box, ID:", id);
    dispatch(setMusicAssetId(id));
    dispatch(musicPlayerDialog());
  };

  return (
    <Card
      className={`relative grid min-h-[5rem] cursor-pointer w-[19.4rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md`}
      onClick={handleClick}
    >
      <CardBody className={`relative flex flex-col justify-center p-3`}>
        <div className="flex justify-center items-center flex-row gap-2">
          <Avatar
            src={imgSong || "/image/default-picture.jpg"}
            size="md"
            alt={musicName || "Music"}
            variant="rounded"
            onError={(e: any) => {
              e.target.src = "/image/default-picture.jpg";
            }}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{musicName}</p>
            <p className="text-xs">{musicStyle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

export default AssetMusicianBox;
