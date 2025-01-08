import {
  PlayIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Progress } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import {
  reactionCompositionMediaPlayer,
  reactionArrangementMediaPlayer,
  reactionAddShopping,
  shoppingMusicSize,
} from "@/default/reaction";
import Reaction from "../reaction/reaction";
import ReactionIcons from "../reaction/reaction-icons";
import ReactionShopping from "../reaction/reaction-shopping";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { MusicallService } from "@/services/musicall.service";

function MediaPlayerV2() {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const musicDetail = useSelector(
    (state: RootState) => state.offer.musicDetail
  );

  useEffect(() => {
    if (musicDetail) {
      setIsLiked(musicDetail.isLiked || false);
      setLikesCount(musicDetail.likesCount || 0);
    }
  }, [musicDetail]);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const result = await MusicallService.likeMusic(selectedId);
      if (result.success) {
        setIsLiked(!isLiked);
        setLikesCount((prev) => prev + (isLiked ? -1 : 1));
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const isMusicAssets = useSelector(
    (state: RootState) => state.offer.isMusicAssets
  );
  const searchParams = useSearchParams();
  let version = searchParams.get("ver");
  return (
    <div className="flex flex-row justify-between p-4 gap-16 w-full border-t-2 border-b-2 border-black/10">
      <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
        <img
          src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd"
          alt=""
          width="77"
          height="77"
          className="rounded-lg bg-slate-100"
          loading="lazy"
        />
        <div className="flex flex-row gap-4 items-center ml-4">
          <PlayIcon
            height={40}
            width={40}
            className="border-2 rounded-full p-2 border-black/30 cursor-pointer"
          />
          <p className="text-xs">2.10</p>
          <div className=" w-[20rem] max-w-[20rem]">
            <Progress
              value={50}
              variant="gradient"
              size="sm"
              className="border border-gray-900/10 bg-gray-900/5"
            />
          </div>
          <p className="text-xs">3.40</p>
          <SpeakerWaveIcon height={24} width={24} className="cursor-pointer" />
          <div className=" w-[5rem] max-w-[5rem]">
            <Progress
              value={50}
              variant="gradient"
              size="sm"
              className="border border-gray-900/10 bg-gray-900/5"
            />
          </div>
        </div>
      </div>
      <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
        <div className="flex flex-row gap-2 ml-[2rem]">
          <div className="flex flex-row gap-[0.4rem] items-center">
            <img
              onClick={handleLike}
              className="cursor-pointer hover:scale-125"
              src={"/icons/new-like.png"}
              style={{ height: 18, width: 18 }}
            />
            <p className="text-[0.7rem] text-black font-semibold">
              {likesCount}
            </p>
          </div>
          <div
            className={`${
              version == "assets" || isMusicAssets ? "" : "hidden"
            }`}
          >
            <ReactionShopping
              data={reactionAddShopping}
              customSize={shoppingMusicSize}
            />
          </div>
          <img
            src={"/icons/collect-icon.png"}
            style={{ height: 24, width: 24 }}
            className="hover:scale-125 cursor-pointer"
          />
          <ArrowTopRightOnSquareIcon
            height={24}
            width={24}
            className="hover:scale-125 text-black cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default MediaPlayerV2;
