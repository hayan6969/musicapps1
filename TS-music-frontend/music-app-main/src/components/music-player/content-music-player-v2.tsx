"use client";
import React, { Suspense } from "react";
import ContentLeftSideV2 from "./content-left-side-v2";
import ContentRightSideAssets from "./content-right-side-assets";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MusicAssetService } from "@/services/music-asset.service";
import { MusicCreationService } from "@/services/music-creation.service";

// Only load home component dynamically since it's not always needed
const ContentRightSideHome = dynamic(
  () => import("./content-right-side-home"),
  {
    ssr: false,
  }
);

interface ContentMusicPlayerV2Props {
  source?: "assets" | "home";
}

function ContentMusicPlayerV2({ source = "home" }: ContentMusicPlayerV2Props) {
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const currentSource = useSelector((state: RootState) => state.offer.source);
  const [musicData, setMusicData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!selectedId) return;

      try {
        let data;
        if (currentSource === "assets") {
          data = await MusicAssetService.getMusicAssetById(selectedId);
        } else {
          data = await MusicCreationService.getMusicCreationById(selectedId);
        }
        setMusicData(data);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchData();
  }, [selectedId, currentSource]);

  const RightSideComponent =
    source === "assets" ? ContentRightSideAssets : ContentRightSideHome;

  return (
    <div className="flex flex-row gap-6 justify-between p-2 my-2 mx-4 h-[30rem] min-w-screen max-w-screen">
      <ContentLeftSideV2 musicData={musicData} />
      <Suspense fallback={<div>Loading...</div>}>
        <RightSideComponent musicData={musicData} key={source} />
      </Suspense>
    </div>
  );
}

export default ContentMusicPlayerV2;
