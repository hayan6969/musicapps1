"use client";

import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { musicBackgroundDialog } from "@/redux/features/offer/offerSlice";
import MusicBackgroundDialog from "@/components/share-work-creation/music-background-dialog";

export function ShareLyrics() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <section className="flex flex-row justify-center items-center my-8">
      <MusicBackgroundDialog />
      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-8">
          <div className="w-96">
            {/* LEFT */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Lyric Name
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Song Language (Optional)
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option defaultValue={"Select Language"}>
                    Song Language
                  </option>
                  <option value="EN">English</option>
                  <option value="JP">Japanese</option>
                  <option value="GR">German</option>
                  <option value="FR">French</option>
                  <option value="IT">Italian</option>
                  <option value="SP">Spanish</option>
                  <option value="KR">Korean</option>
                  <option value="CH">Chinese</option>
                  <option value="AR">Arabic</option>
                </select>
              </div>
              <div className="flex flex-col gap-10">
                <div className="flex justify-center items-center gap-2 my-10">
                  <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
                    Upload Cover Image
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Less than 1M</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div className="w-[18rem] max-w-[9.8rem] flex flex-col justify-center items-center gap-2 font-semibold text-xs text-center">
                    Please select music playback background
                    <label
                      // htmlFor="dropzone-file-music-bg"
                      className="flex flex-col items-center justify-center w-[10rem] h-[3rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Select</span>
                        </p>
                      </div>
                      <input
                        className="hidden"
                        onClick={() => dispatch(musicBackgroundDialog())}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center gap-2 items-center">
                  <div className="w-[18rem] max-w-[9.8rem] flex flex-col justify-center items-center gap-2 font-semibold text-xs text-center">
                    <p className="text-blue-600">
                      Upload Music Playback Background
                    </p>
                    <label
                      htmlFor="dropzone-file-music-bg"
                      className="flex flex-col items-center justify-center w-[10rem] h-[3rem] border-2 border-blue-600 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="text-sm text-gray-500">
                          <span className="font-semibold">Less than 500k</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file-music-bg"
                        type="file"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 max-w-[28rem]">
                  <Button
                    className="bg-blue-200 text-black normal-case w-[16rem] flex items-center justify-center"
                    color="blue"
                    variant="filled"
                  >
                    <span className=" text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                    Upgrade to gain more attention
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-96">
            {/* RIGHT */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Write Lyric
              </Typography>
              <Textarea className="w-96 !h-[37rem]" />
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Suitable Music Style
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option defaultValue={"Select Music Style"}>
                    Select Music Style
                  </option>
                  <option value="ambient">Ambient</option>
                  <option value="blues">Blues</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                  <option value="disco">Disco</option>
                  <option value="dubstep">Dubstep</option>
                  <option value="epic">Epic</option>
                  <option value="folk">Folk</option>
                  <option value="funk">Funk</option>
                  <option value="hip-hop">Hip hop</option>
                  <option value="holiday">Holiday</option>
                  <option value="house">House</option>
                  <option value="indie-pop">Indie Pop</option>
                  <option value="jazz">Jazz</option>
                  <option value="latin">Latin</option>
                  <option value="metal">Metal</option>
                  <option value="neo-soul">Neo-Soul</option>
                  <option value="new-age">New Age</option>
                  <option value="orchestral">Orchestral</option>
                  <option value="piano">Piano</option>
                  <option value="pop">Pop</option>
                  <option value="r&b">R&B</option>
                  <option value="rap">Rap</option>
                  <option value="reggae">Reggae</option>
                  <option value="rock">Rock</option>
                  <option value="samba">Samba</option>
                  <option value="trap">Trap</option>
                  <option value="underscore">Underscore</option>
                  <option value="video-game">Video Game</option>
                  <option value="world">World</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Lyric Mood
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option defaultValue={"Select Music Usage"}>
                    Select Music Mood
                  </option>
                  <option value="aggressive">Aggressive</option>
                  <option value="beautiful">Beautiful</option>
                  <option value="bright">Bright</option>
                  <option value="busy">Busy</option>
                  <option value="dark">Dark</option>
                  <option value="driving">Driving</option>
                  <option value="exciting">Exciting</option>
                  <option value="feel-good">Feel-good</option>
                  <option value="formal">Formal</option>
                  <option value="funny">Funny</option>
                  <option value="gentle">Gentle</option>
                  <option value="happy">Happy</option>
                  <option value="heroic">Heroic</option>
                  <option value="hypnotic">Hypnotic</option>
                  <option value="inspiring">Inspiring</option>
                  <option value="laid-back">Laid-back</option>
                  <option value="light-tension">Light Tension</option>
                  <option value="magical">Magical</option>
                  <option value="mechanical">Mechanical</option>
                  <option value="neutral">Neutral</option>
                  <option value="nostalgic">Nostalgic</option>
                  <option value="peaceful">Peaceful</option>
                  <option value="quirky">Quirky</option>
                  <option value="reflective">Reflective</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="romantic">Romantic</option>
                  <option value="sad">Sad</option>
                  <option value="scary">Scary</option>
                  <option value="serious">Serious</option>
                  <option value="sexy">Sexy</option>
                  <option value="spooky">Spooky</option>
                  <option value="stealthy">Stealthy</option>
                  <option value="strange">Strange</option>
                  <option value="tense">Tense</option>
                  <option value="uplifting">Uplifting</option>
                  <option value="urgent">Urgent</option>
                  <option value="violent">Violent</option>
                  <option value="warm">Warm</option>
                  <option value="whimsical">Whimsical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="my-2 w-full">
            {/* BOTTOM */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Tags (Fill in the key attribute words of the song for easy
                search, separated by commas)
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Description
              </Typography>
              <Textarea className="w-96 h-56" />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Software Tool (Optional)
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <div>
            <Button
              className="bg-blue-gray-100 text-black w-[8rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
            >
              Cancel
            </Button>
          </div>
          <div className="flex flex-row gap-6">
            <Button
              className="bg-blue-gray-100 text-black w-[14rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
            >
              Save as Draft
            </Button>
            <Button className="w-[14rem]" color="blue" fullWidth>
              Publish
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ShareLyrics;
