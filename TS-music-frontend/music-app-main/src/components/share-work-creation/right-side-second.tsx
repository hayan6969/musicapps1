// components/share-work-creation/right-side-second.tsx
"use client";

import { Button } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface RightSideSecondProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const musicUse = [
  "Pop Music",
  "Folk Music",
  "Game Music",
  "Movie Music",
  "Classical Music",
  "Children Music",
  "Dance Music",
  "Travel Music",
  "Animation Music",
  "Light Music",
];

const musicStyles = [
  "Ambient",
  "Blues",
  "Cinematic",
  "Classical",
  "Country",
  "Disco",
  "Dubstep",
  "Epic",
  "Folk",
  "Funk",
  "Hip hop",
  "Holiday",
  "House",
  "Indie Pop",
  "Jazz",
  "Latin",
  "Metal",
  "Neo-Soul",
  "New Age",
  "Orchestral",
  "Piano",
  "Pop",
  "R&B",
  "Rap",
  "Reggae",
  "Rock",
  "Samba",
  "Trap",
  "Underscore",
  "Video Game",
  "World",
];

const musicMoods = [
  "Aggressive",
  "Beautiful",
  "Bright",
  "Dark",
  "Dramatic",
  "Energetic",
  "Happy",
  "Inspirational",
  "Melancholic",
  "Peaceful",
  "Romantic",
  "Sad",
  "Suspenseful",
  "Uplifting",
];

function RightSideSecond({ register, errors }: RightSideSecondProps) {
  return (
    <div className="mb-1 flex flex-col gap-10 mt-10">
      {/* Music Use Section */}
      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-gray-900">
          Music Use
        </label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {musicUse.map((use, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`musicUse-${use.toLowerCase().replace(/\s+/g, "-")}`}
                type="checkbox"
                value={use.toLowerCase()}
                {...register("musicUse", {
                  required: "Please select at least one music use",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={`musicUse-${use.toLowerCase().replace(/\s+/g, "-")}`}
                className="ms-2 text-sm font-medium text-gray-900"
              >
                {use}
              </label>
            </div>
          ))}
        </div>
        {errors.musicUse && (
          <span className="text-red-500 text-xs mt-1">
            {errors.musicUse.message as string}
          </span>
        )}
      </div>

      {/* Music Style Section */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="musicStyle"
          className="block text-sm font-semibold text-gray-900"
        >
          Music Style
        </label>
        <select
          id="musicStyle"
          {...register("musicStyle", {
            required: "Please select a music style",
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select Music Style</option>
          {musicStyles.map((style) => (
            <option key={style} value={style.toLowerCase()}>
              {style}
            </option>
          ))}
        </select>
        {errors.musicStyle && (
          <span className="text-red-500 text-xs mt-1">
            {errors.musicStyle.message as string}
          </span>
        )}
      </div>

      {/* Music Mood Section */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="musicMood"
          className="block text-sm font-semibold text-gray-900"
        >
          Music Mood
        </label>
        <select
          id="musicMood"
          {...register("musicMood")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select Music Mood</option>
          {musicMoods.map((mood) => (
            <option key={mood} value={mood.toLowerCase()}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      {/* PRO Button Section */}
      <div className="flex justify-center items-center gap-2 max-w-[28rem] h-[13rem]">
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

      <div className="flex flex-col gap-1">
        <label className="block text-sm font-semibold text-gray-900">
          My Role *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Composer", "Arranger", "Producer", "Lyricist"].map((role) => (
            <div key={role} className="flex items-center">
              <input
                type="checkbox"
                id={`role-${role.toLowerCase()}`}
                value={role.toLowerCase()}
                {...register("myRole", {
                  required: "Please select at least one role",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <label
                htmlFor={`role-${role.toLowerCase()}`}
                className="ml-2 text-sm font-medium text-gray-900"
              >
                {role}
              </label>
            </div>
          ))}
        </div>
        {errors.myRole && (
          <span className="text-red-500 text-xs">
            {errors.myRole.message as string}
          </span>
        )}
      </div>
    </div>
  );
}

export default RightSideSecond;
