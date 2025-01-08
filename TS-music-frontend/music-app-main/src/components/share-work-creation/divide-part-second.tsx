// components/share-work-creation/divide-part-second.tsx
"use client";

import { Button } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface DividePartSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function DividePartSecond({ register, errors }: DividePartSecondProps) {
  return (
    <>
      <div className="flex gap-2 ml-9">
        <div className="w-[18rem] max-w-[9.8rem] flex flex-col justify-center items-center gap-2 font-semibold text-xs text-center">
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
              {...register("musicBackground", {
                required: "Background image is required"
              })}
            />
          </label>
          {errors.musicBackground && (
            <span className="text-red-500 text-xs">{errors.musicBackground.message as string}</span>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 max-w-[28rem]">
        <Button
          className="bg-blue-200 text-black normal-case w-[16rem] flex items-center justify-center"
          color="blue"
          variant="filled"
        >
          <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
            PRO
          </span>
          Upgrade to gain more attention
        </Button>
      </div>
    </>
  );
}

export default DividePartSecond;