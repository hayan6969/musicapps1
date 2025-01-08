import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

import { PlayIcon } from "@heroicons/react/24/solid";
import Reaction from "../reaction/reaction";
import {
  customSize,
  reactionArrangementMediaPlayer,
  reactionCompositionMediaPlayer,
  reactionLyricMediaPlayer,
} from "@/default/reaction";
import ReactionIcons from "../reaction/reaction-icons";
import ReactionBox from "../reaction/reaction-box";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  musicAssets,
  musicPlayerDialog,
  setSelectedId,
  setMusicDetail,
} from "@/redux/features/offer/offerSlice";
import { MusicallService } from "@/services/musicall.service";

interface CategoryCardProps {
  id: string;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
  withName?: boolean;
  withFindSimilar?: boolean;
  withSale?: boolean;
  isMusicAssets?: boolean;
  musicStyle: string;
  tags: string[] | string;
  createdBy: string;
  myRole: string[];
  initialLikesCount?: number;
  initialIsLiked?: boolean;
}

function BoxWithInfo({
  id,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
  withName = true,
  withFindSimilar = false,
  withSale = true,
  isMusicAssets = false,
  musicStyle,
  tags,
  createdBy,
  myRole,
  initialLikesCount = 0,
  initialIsLiked = false,
}: CategoryCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const tagsArray = typeof tags === "string" ? tags.split(",") : tags || [];

  useEffect(() => {
    const fetchMusicDetails = async () => {
      try {
        const details = await MusicallService.getMusicDetails(id);
        if (details) {
          setIsLiked(details.isLiked || false);
          setLikesCount(details.likesCount || 0);
        }
      } catch (error) {
        console.error("Error fetching music details:", error);
      }
    };

    fetchMusicDetails();
  }, [id]);

  const handleCardClick = async () => {
    try {
      dispatch(setSelectedId(id));
      const musicDetails = await MusicallService.getMusicDetails(id);
      dispatch(setMusicDetail(musicDetails));
      dispatch(musicPlayerDialog());
    } catch (error) {
      console.error("Error fetching music details:", error);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await MusicallService.likeMusic(id);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikesCount((prev) => prev + (isLiked ? -1 : 1));
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <>
      <div className="max-w-fit">
        <Card
          className={`relative cursor-pointer grid min-h-[5rem] w-[21rem] overflow-hidden hover:shadow-xl shadow-md border-2 rounded-md group`}
          onClick={handleCardClick}
        >
          <CardBody
            className={`relative bg-[url('/image/music-background/background-2.jpg')] bg-cover bg-no-repeat flex flex-col justify-center p-3`}
          >
            <div className="absolute inset-0 h-full w-full bg-gray-900/50" />
            <div className={``}>
              <div className={`flex flex-col gap-2`}>
                <div className="flex justify-center items-center flex-row gap-2">
                  <Avatar
                    src={imgSong}
                    size="md"
                    alt="avatar"
                    variant="rounded"
                  />
                  <div className="w-[12rem] max-w-[12rem] relative">
                    <Typography
                      variant="small"
                      color={"white"}
                      className="font-bold font-notoCondensed text-[0.9rem]"
                    >
                      {songName}
                    </Typography>
                    <div className="flex flex-row justify-between gap-[0.2rem]">
                      <div className="flex flex-row gap-[0.2rem]">
                        <Typography
                          variant="small"
                          color={"white"}
                          className="font-bold text-xs"
                        >
                          {singerName}
                        </Typography>
                        <p className={`text-[0.6rem] pt-1 text-white`}>
                          Singer
                        </p>
                      </div>
                      <div>
                        <p className={`text-[0.6rem] font-semibold text-white`}>
                          03:43
                        </p>
                      </div>
                    </div>
                  </div>
                  <PlayIcon
                    className="h-9 w-9 cursor-pointer hover:scale-125 relative"
                    color={"white"}
                  />
                  {withFindSimilar ? (
                    <>
                      <Tooltip
                        className="text-xs"
                        content="Try listening to similar music"
                        placement="top"
                      >
                        <img
                          className="absolute bottom-1 right-1 cursor-pointer hover:scale-125 hidden group-hover:block"
                          src={"/icons/find-similar.png"}
                          style={{ height: 15, width: 15 }}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </CardBody>
          <div className="flex justify-between p-2 items-center">
            <p className="text-sm">{musicStyle}</p>
            <div className="flex gap-1.5">
              {tagsArray.map((t, index) => (
                <p
                  key={index}
                  className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-sm"
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
        </Card>
        <div className="flex flex-row gap-1 border[3rem] max-h-[3rem] py-2 pl-1 justify-between items-center">
          {withName ? (
            <>
              <div className="flex flex-row gap-2 items-center">
                <Avatar
                  src={imgSong}
                  size="xs"
                  alt="avatar"
                  variant="circular"
                />
                <div className="flex flex-col max-h-[3rem] max-w-[12rem] pt-1">
                  <p className="text-xs text-black font-bold font-notoCondensed">
                    {createdBy}
                  </p>
                  <div className="flex flex-row gap-[0.2rem] max-h-[3rem] max-w-[12rem]">
                    <p className="text-[0.5rem] text-black font-bold">
                      {myRole.join(", ")}
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
          <ReactionBox
            withSale={withSale}
            likesCount={likesCount}
            isLiked={isLiked}
            onLike={handleLike}
          />
        </div>
      </div>
    </>
  );
}
export default BoxWithInfo;
