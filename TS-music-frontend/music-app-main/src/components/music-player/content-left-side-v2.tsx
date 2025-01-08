"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MusicAssetService } from "@/services/music-asset.service";
import { MusicCreationService } from "@/services/music-creation.service";
import { getAuthToken } from "@/utils/auth";

interface ContentLeftSideV2Props {
  musicData: any;
}

function ContentLeftSideV2({ musicData }: ContentLeftSideV2Props) {
  const currentSource = useSelector((state: RootState) => state.offer.source);
  const [likeCount, setLikeCount] = React.useState(
    musicData?.likes?.length || 0
  );
  const [isLiked, setIsLiked] = React.useState(false);

  const handleLyricLike = async () => {
    if (!musicData?.id) return;

    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const endpoint =
        currentSource === "assets"
          ? `http://localhost:3000/v1/music-asset/like/${musicData.id}`
          : `http://localhost:3000/v1/music-creation/like/${musicData.id}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsLiked(!isLiked);
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        console.error("Failed to update like");
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Update like count when musicData changes
  React.useEffect(() => {
    setLikeCount(musicData?.likes?.length || 0);
  }, [musicData]);

  return (
    <div className="flex flex-col py-4 px-6 gap-4 w-[29rem] border-2 border-black rounded-xl">
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Lyric :</p>
        <div className="flex flex-row gap-[0.4rem] items-center">
          <img
            onClick={handleLyricLike}
            className="cursor-pointer hover:scale-125"
            src={isLiked ? "/icons/new-like-filled.png" : "/icons/new-like.png"}
            style={{ height: 18, width: 18 }}
            alt="like"
          />
          <p className="text-[0.7rem] text-black font-semibold">{likeCount}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Music Name:</p>
        <p>{musicData?.musicName}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Singer Name :</p>
        <p className="text-xs">{musicData?.singerName || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Publisher :</p>
        <p className="text-xs">{musicData?.publisher || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Music Usage :</p>
        <p className="text-xs">{musicData?.musicUsage}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Music Style :</p>
        <p className="text-xs">{musicData?.musicStyle}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Mood :</p>
        <p className="text-xs">{musicData?.musicMood}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Musical Instrument :</p>
        <p className="text-xs">{musicData?.musicInstrument || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Software Tools :</p>
        <p className="text-xs">{musicData?.softwareTool || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Label :</p>
        <p className="text-xs">{musicData?.label || "N/A"}</p>
      </div>
      <div className="flex flex-row gap-2">
        <p className="text-xs font-notoSemibold">Tags :</p>
        <p className="text-xs">
          {musicData?.tags
            ? typeof musicData.tags === "string"
              ? musicData.tags
              : musicData.tags.join(", ")
            : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default ContentLeftSideV2;
