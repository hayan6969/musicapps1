"use client";
import { fetchMusicData } from "../../conf/music";
import AssetMusicianBox from "@/components/music-box/asset-musician-box";
import MusicPlayerDialog from "../../components/music-player/music-player-dialog";
import { useEffect, useState } from "react";

interface MusicAsset {
  id: string;
  musicName: string;
  musicImage: string;
  createdBy: string;
  musicStyle: string;
  tags: string;
  description: string;
  personalUsePrice: string;
  commercialUsePrice: string;
  musicMood: string;
  musicInstrument: string;
  softwareTool: string;
  music: string;
}

export function FindCreatives() {
  const [musicData, setMusicData] = useState<MusicAsset[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMusicData();
        console.log("Fetched music data:", data);
        if (Array.isArray(data)) {
          setMusicData(data);
        }
      } catch (error) {
        console.error("Error loading music data:", error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <section className="grid min-h-screen">
        <MusicPlayerDialog source="assets" />
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {musicData.map((item) => (
                <AssetMusicianBox
                  key={item.id}
                  id={item.id}
                  imgSong={item.musicImage}
                  musicName={item.musicName}
                  musicStyle={item.musicStyle}
                  tags={
                    item.tags
                      ? item.tags.split(",").map((tag) => tag.trim())
                      : []
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FindCreatives;
