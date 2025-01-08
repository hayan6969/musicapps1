// components/share-work-creation/music-background-dialog.tsx
"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { musicBackgroundDialog } from "@/redux/features/offer/offerSlice";
import { UseFormSetValue } from "react-hook-form";

interface MusicBackgroundDialogProps {
  setValue: UseFormSetValue<any>;
}

const backgrounds = [
  { id: 1, path: "/image/music-background/music-bg-1.png" },
  { id: 2, path: "/image/music-background/music-bg-2.png" },
  { id: 3, path: "/image/music-background/music-bg-3.png" },
  { id: 4, path: "/image/music-background/music-bg-4.png" },
  { id: 5, path: "/image/music-background/music-bg-5.png" },
  { id: 6, path: "/image/music-background/music-bg-6.png" },
  { id: 7, path: "/image/music-background/music-bg-7.png" },
  { id: 8, path: "/image/music-background/music-bg-8.png" },
  { id: 9, path: "/image/music-background/music-bg-9.png" },
  { id: 10, path: "/image/music-background/music-bg-10.png" },
  { id: 11, path: "/image/music-background/music-bg-11.png" },
  { id: 12, path: "/image/music-background/music-bg-12.png" },
];

export default function MusicBackgroundDialog({
  setValue,
}: MusicBackgroundDialogProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector(
    (state: RootState) => state.offer.musicBackgroundDialog
  );
  const [selectedBackground, setSelectedBackground] = useState<number | null>(
    null
  );

  const handleClose = () => {
    dispatch(musicBackgroundDialog());
  };

  const handleSelection = (backgroundId: number) => {
    setSelectedBackground(backgroundId);
  };

  const handleSave = () => {
    if (selectedBackground && setValue) {
      setValue("selectedBackground", selectedBackground);

      // Find the selected background path
      const selectedBg = backgrounds.find((bg) => bg.id === selectedBackground);
      if (selectedBg) {
        setValue("musicBackgroundPath", selectedBg.path);
      }
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} handler={handleClose} size="xxl">
      <DialogBody divider className="max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 p-4">
          {backgrounds.map((background) => (
            <div
              key={background.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedBackground === background.id
                  ? "ring-4 ring-blue-500"
                  : "hover:ring-2 hover:ring-blue-300"
              }`}
              onClick={() => handleSelection(background.id)}
            >
              <img
                src={background.path}
                alt={`Background ${background.id}`}
                className="w-full h-[70px] object-cover rounded-lg"
              />
              {selectedBackground === background.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg">
                  <div className="absolute top-2 right-2">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-end gap-2 p-4">
        <Button
          variant="outlined"
          color="gray"
          onClick={handleClose}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          color="blue"
          onClick={handleSave}
          disabled={!selectedBackground}
        >
          Save Selection
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
