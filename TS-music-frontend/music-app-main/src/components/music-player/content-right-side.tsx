import { Input, Textarea } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface MusicDetail {
  musicStyle?: string;
  instrument?: string;
  movieGameType?: string;
  softwareTools?: string;
  label?: string;
  description?: string;
}

function ContentRightSide() {
  const musicDetail = useSelector(
    (state: RootState) => state.offer.musicDetail
  ) as MusicDetail;

  return (
    <div className="flex flex-col py-4 px-6 gap-2 w-[32rem] overflow-y-auto border-2 border-black rounded-xl">
      <div className="flex flex-row gap-2">
        <p className="text-xs">Music Style :</p>
        <p className="text-xs">{musicDetail?.musicStyle || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Musical Instrument :</p>
        <p className="text-xs">{musicDetail?.instrument || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Movie/Game Type :</p>
        <p className="text-xs">{musicDetail?.movieGameType || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Software Tools :</p>
        <p className="text-xs">{musicDetail?.softwareTools || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs">Label :</p>
        <p className="text-xs">{musicDetail?.label || "N/A"}</p>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <p className="text-xs">Describe</p>
        <Textarea
          value={musicDetail?.description || ""}
          className="text-xs !h-32"
          readOnly
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs">Comment</p>
        <Input crossOrigin={""} readOnly />
      </div>
    </div>
  );
}

export default ContentRightSide;
