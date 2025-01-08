"use client";

import React from "react";
import TopMusicPlayer from "@/components/music-player/top-music-player";
import ContentMusicPlayer from "@/components/music-player/content-music-player";
import MediaPlayer from "@/components/music-player/media-player";
import MusicRecommendations from "@/components/music-player/music-recommendations";

export function MusicPlayer() {
  return (
    // <div className="relative bg-[url('/image/login.jpg')] bg-cover bg-no-repeat">
    //       {/* <div className="absolute inset-0 h-full w-full bg-gray-900/60" /> */}
    //     </div>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-row w-[77.5rem] h-full border-black/10 border-2 rounded-xl shadow-md">
        <div className="relative w-[88rem] h-[41rem] rounded-s-xl border-slate-100 border-b space-y-2 items-center">
          <div className="flex flex-row">
            <div className="flex flex-col">
              <TopMusicPlayer />
              <ContentMusicPlayer />
              <MediaPlayer />
            </div>
            <MusicRecommendations />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
