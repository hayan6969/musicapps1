"use client";
import React, { useEffect } from "react";
import { Dialog } from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { musicPlayerDialog } from "@/redux/features/offer/offerSlice";
import MusicPlayerV2 from "@/app/music-player/music-player-v2";

interface MusicPlayerDialogProps {
  source?: "assets" | "home";
}

export default function MusicPlayerDialog({
  source = "home",
}: MusicPlayerDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isMusicPlayerDialog = useSelector(
    (state: RootState) => state.offer.musicPlayerDialog
  );
  const isMusicAssets = useSelector(
    (state: RootState) => state.offer.isMusicAssets
  );

  // Only fetch if dialog is open and we're on the correct page
  useEffect(() => {
    if (isMusicPlayerDialog) {
      // Only fetch music-asset data if we're on the assets page
      if (source === "assets" && isMusicAssets) {
        // Fetch music-asset data
        console.log("Fetching music-asset data");
      } else {
        // Fetch music-creation data
        console.log("Fetching music-creation data");
      }
    }
  }, [isMusicPlayerDialog, isMusicAssets, source]);

  return (
    <>
      <Dialog
        open={isMusicPlayerDialog}
        handler={() => dispatch(musicPlayerDialog())}
        size="lg"
      >
        <MusicPlayerV2 source={source} />
      </Dialog>
    </>
  );
}
