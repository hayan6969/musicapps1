import {
  reactionLyricMediaPlayer,
  customSize,
  reactionCompositionMediaPlayer,
  reactionArrangementMediaPlayer,
  reactionAddShoppingSmall,
  reactionAddShopping,
  shoppingMusicSize,
} from "@/default/reaction";
import React from "react";
import ReactionIcons from "./reaction-icons";
import ReactionShopping from "./reaction-shopping";
import { HeartIcon } from "@heroicons/react/24/outline";

interface ReactionBoxProps {
  withSale?: boolean;
  likesCount: number;
  isLiked: boolean;
  onLike: (e: React.MouseEvent) => void;
}

function ReactionBox({
  withSale = true,
  likesCount,
  isLiked,
  onLike,
}: ReactionBoxProps) {
  const handleClick = (e: React.MouseEvent) => {
    onLike(e);
  };

  return (
    <div className="flex flex-row">
      {withSale && (
        <>
          <ReactionShopping
            data={reactionAddShopping}
            customSize={shoppingMusicSize}
          />
          <span className="mr-1"></span>
        </>
      )}
      <div className="flex flex-row gap-[0.4rem] items-center">
        <img
          onClick={handleClick}
          className="cursor-pointer hover:scale-125"
          src="/icons/new-like.png"
          style={{ height: 18, width: 18 }}
          alt="like"
        />
        <p className="text-[0.7rem] font-semibold">{likesCount}</p>
      </div>
    </div>
  );
}

export default ReactionBox;
