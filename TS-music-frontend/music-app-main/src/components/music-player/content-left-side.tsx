import { Textarea } from "@material-tailwind/react";
import React from "react";
import Reaction from "../reaction/reaction";
import { reactionLyricMediaPlayer } from "@/default/reaction";

function ContentLeftSide() {
  return (
    <div className="flex flex-col py-4 px-6 gap-2 w-[24rem] border-2 border-black rounded-xl">
      <div className="flex flex-row gap-2">
        <p className="text-xs">Song Title :</p>
        <p className="text-xs">Dummy</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Singer Name :</p>
        <p className="text-xs">Dummy</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Music Culture Area :</p>
        <p className="text-xs">Dummy</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Publisher :</p>
        <p className="text-xs">Dummy</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Release Date :</p>
        <p className="text-xs">Dummy</p>
      </div>
      <div className="flex flex-col mt-2">
        <Textarea className="text-xs !h-[15rem] overflow-y-auto" readOnly />
        <div className="flex flex-row justify-end items-center gap-2">
          <Reaction data={reactionLyricMediaPlayer} />
        </div>
      </div>
    </div>
  );
}

export default ContentLeftSide;
