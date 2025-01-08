// components/share-work-creation/left-side-second.tsx
"use client";

import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { musicBackgroundDialog } from "@/redux/features/offer/offerSlice";

interface LeftSideSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function LeftSideSecond({ register, errors }: LeftSideSecondProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBackground, setSelectedBackground] = useState<string>("");

  const handleBackgroundSelect = () => {
    dispatch(musicBackgroundDialog());
  };

  return (
    <div className="mb-1 flex flex-col gap-4 mt-6 items-center">
      <div className="flex flex-col gap-10">
        {/* Lyric Upload Section */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
            Upload Lyric
            <label
              htmlFor="musicLyric"
              className="flex flex-col items-center justify-center w-[10rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Less than 50k</span>
                </p>
              </div>
              <input
                id="musicLyric"
                type="file"
                className="hidden"
                accept=".txt,.doc,.docx,.pdf"
                {...register("musicLyric")}
              />
            </label>
            {errors.musicLyric && (
              <span className="text-red-500 text-xs">{errors.musicLyric.message as string}</span>
            )}
          </div>
        </div>

        {/* Music Background Selection Section */}
        <div className="flex justify-center items-center gap-2">
          <div className="w-[18rem] max-w-[9.8rem] flex flex-col justify-center items-center gap-2 font-semibold text-xs text-center">
            Please select music playback background
            <button
              type="button"
              onClick={handleBackgroundSelect}
              className="flex flex-col items-center justify-center w-[10rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Select</span>
                </p>
              </div>
              <input
                type="hidden"
                {...register("selectedBackgroundId")}
                value={selectedBackground}
              />
            </button>
            {errors.selectedBackgroundId && (
              <span className="text-red-500 text-xs">
                {errors.selectedBackgroundId.message as string}
              </span>
            )}
          </div>
        </div>

        {/* Custom Background Upload Section */}
        <div className="flex gap-2 items-center">
          <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-xs text-center">
            <p className="text-blue-600">Upload Music Playback Background</p>
            <label
              htmlFor="musicBackground"
              className="flex flex-col items-center justify-center w-[10rem] h-[3rem] border-2 border-blue-600 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Less than 500k</span>
                </p>
              </div>
              <input
                id="musicBackground"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("musicBackground")}
              />
            </label>
            {errors.musicBackground && (
              <span className="text-red-500 text-xs">
                {errors.musicBackground.message as string}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideSecond;