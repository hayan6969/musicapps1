import {
  PlayIcon,
  SpeakerWaveIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Progress } from "@material-tailwind/react";
import React from "react";
import {
  reactionCompositionMediaPlayer,
  reactionArrangementMediaPlayer,
  reactionAddShopping,
  shoppingMusicSize,
} from "@/default/reaction";
import Reaction from "../reaction/reaction";
import ReactionIcons from "../reaction/reaction-icons";
import ReactionShopping from "../reaction/reaction-shopping";

function MediaPlayer() {
  return (
    <div className="flex flex-row justify-center items-center px-4 py-1 border-t-2 border-black/10">
      <div className="flex flex-row justify-between gap-16">
        <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
          <img
            src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd"
            alt=""
            width="44"
            height="44"
            className="rounded-lg bg-slate-100"
            loading="lazy"
          />
          <PlayIcon
            height={30}
            width={30}
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
        <div className="min-w-0 flex flex-row items-center font-semibold gap-3">
          <div className="flex flex-col mt-2">
            <div className="flex flex-row justify-center items-center gap-2">
              <Reaction data={reactionCompositionMediaPlayer} />
              <Reaction data={reactionArrangementMediaPlayer} />
            </div>
          </div>
          <div className="flex flex-row gap-2 ml-[2rem]">
            <ReactionShopping
              data={reactionAddShopping}
              customSize={shoppingMusicSize}
            />
            <img
              src={"/icons/collect-icon.png"}
              style={{ height: 24, width: 24 }}
              className="hover:scale-125 cursor-pointer"
            />
            <ArrowTopRightOnSquareIcon
              height={24}
              width={24}
              className="hover:scale-125 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaPlayer;
