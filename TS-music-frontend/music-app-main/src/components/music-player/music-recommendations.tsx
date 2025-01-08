// import { JOBS_PROPS } from "@/dummy/example";
import { JOBS_PROPS } from "@/conf/music";
import React from "react";
import OriginalBox from "../music-box/original-box";

function MusicRecommendations() {
  return (
    <div className="w-[18.8rem] h-[41rem] flex flex-col items-center overflow-y-auto p-2 rounded-e-xl border-l-2 border-black/10">
      <div className="grid grid-cols-1 gap-3">
        {JOBS_PROPS.map((props, key) => (
          <OriginalBox key={key} {...props} />
        ))}
      </div>
    </div>
  );
}

export default MusicRecommendations;
