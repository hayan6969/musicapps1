// components/share-work-creation/divide-part-first.tsx
"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface DividePartFirstProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function DividePartFirst({ register, errors }: DividePartFirstProps) {
  return (
    <div className="flex flex-col gap-2 w-fit">
      <div className="w-[10rem] ml-[6.8rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
        Upload Music
        <label
          htmlFor="music"
          className="flex flex-col items-center justify-center w-[10rem] h-[6rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Less than 20M</span>
            </p>
          </div>
          <input
            id="music"
            type="file"
            className="hidden"
            accept="audio/*"
            {...register("music", {
              required: "Music file is required"
            })}
          />
        </label>
        {errors.music && (
          <span className="text-red-500 text-xs">{errors.music.message as string}</span>
        )}
      </div>
      <div className="flex gap-2 max-w-[15rem]">
        <p className="text-sm">
          The Music uploaded here is only for trial listening and not for download;
          if you dont have copyright, only upload music clips
        </p>
      </div>
    </div>
  );
}

export default DividePartFirst;