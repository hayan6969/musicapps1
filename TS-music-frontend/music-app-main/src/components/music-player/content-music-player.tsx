import React from "react";
import ContentLeftSide from "./content-left-side";
import ContentRightSide from "./content-right-side";

function ContentMusicPlayer() {
  return (
    <div className="flex flex-row gap-6 justify-center p-2 my-2 h-[30rem]">
      <ContentLeftSide />
      <ContentRightSide />
    </div>
  );
}

export default ContentMusicPlayer;
