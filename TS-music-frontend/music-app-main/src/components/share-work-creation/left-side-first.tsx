// components/share-work-creation/left-side-first.tsx
"use client";

import { Typography, Input } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState } from "react";

interface LeftSideFirstProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function LeftSideFirst({ register, errors }: LeftSideFirstProps) {
  const [musicImagePreview, setMusicImagePreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMusicImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-1 flex flex-col gap-4">
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-bold"
        >
          Music Name
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("musicName", { required: "Music name is required" })}
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          placeholder="Enter music name"
        />
        {errors.musicName && (
          <span className="text-red-500 text-xs">
            {errors.musicName.message as string}
          </span>
        )}
      </div>

      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-bold"
        >
          Singer Name (Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("singerName")}
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-center items-center gap-2">
            <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
              Upload Music Image
              <label
                htmlFor="musicImage"
                className="flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                {musicImagePreview ? (
                  <img
                    src={musicImagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Less than 1M</span>
                    </p>
                  </div>
                )}
                <input
                  id="musicImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  {...register("musicImage", {
                    required: "Music image is required",
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 1024 * 1024) {
                          // 1MB
                          e.target.value = "";
                          alert("Image must be less than 1MB");
                          return;
                        }
                        if (!file.type.startsWith("image/")) {
                          e.target.value = "";
                          alert("File must be an image");
                          return;
                        }
                        handleImageChange(e);
                      }
                    },
                  })}
                />
              </label>
              {errors.musicImage && (
                <span className="text-red-500 text-xs">
                  {errors.musicImage.message as string}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 items-center">
            <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
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
                    required: "Music file is required",
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 20 * 1024 * 1024) {
                          // 20MB
                          e.target.value = "";
                          alert("Music file must be less than 20MB");
                          return;
                        }
                        if (!file.type.startsWith("audio/")) {
                          e.target.value = "";
                          alert("File must be an audio file");
                          return;
                        }
                      }
                    },
                  })}
                />
              </label>
              {errors.music && (
                <span className="text-red-500 text-xs">
                  {errors.music.message as string}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2 px-16 items-center">
            <p className="text-sm">
              {`The Music uploaded here is only for trial listening and not for download; if you don't have copyright, only upload music clips`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSideFirst;
