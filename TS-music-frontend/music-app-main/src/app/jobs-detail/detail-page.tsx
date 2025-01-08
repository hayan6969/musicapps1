"use client";

import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/outline";

export function DetailPage() {
  return (
    <section className="py-10 px-8 flex flex-row gap-[5rem]">
      <div className="max-w-screen-lg text-justify">
        <Typography variant="h5" color="blue-gray">
          Tasks and Responsibilites
        </Typography>

        <Typography className="my-4 font-normal !text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Typography>

        <Typography variant="h5" color="blue-gray" className="mt-8 mb-2">
          So what does the new record for the lowest level of winter ice
          actually mean
        </Typography>

        <Typography className="my-4 font-normal !text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of
          the printing and typesetting industry. Lorem Ipsum has been the
          industrys standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen
          book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </Typography>
        {/* <div className="container mx-auto px-4 pt-2">
          <div className="w-full mb-10 md:flex items-center justify-between">
            <div className="flex mb-5 md:mb-0 items-center gap-3">
              <Button
                variant="gradient"
                color="blue"
                className="hover:scale-110 w-[12rem]"
              >
                APPLY
              </Button>
              <StarIcon
                width={28}
                height={28}
                className="cursor-pointer hover:scale-125"
              />
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex w-full h-[29rem] max-h-screen border-2 border-black rounded-md">
        <div className="p-4">
          <Typography variant="small" color="gray" className="">
            Job Descriptions
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            Composition, Arrangements
          </Typography>
          <Typography variant="small" color="gray" className="">
            Music Cultural Area
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            Europe
          </Typography>
          <Typography variant="small" color="gray" className="">
            Lyrics Language
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            English
          </Typography>
          <Typography variant="small" color="gray" className="">
            Budget
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            US$10,000-25,000
          </Typography>
          <Typography variant="small" color="gray" className="">
            Timeframe
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            Within the next few weeks
          </Typography>
          <Typography variant="small" color="gray" className="">
            Job Location
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            Anywhere
          </Typography>
          <Typography variant="small" color="gray" className="">
            On Site Required
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            Not Required - Remote Okay
          </Typography>
          <Typography variant="small" color="gray" className="">
            Job Posted
          </Typography>
          <Typography variant="h6" color="black" className="mb-2 font-bold">
            July 29th, 2024
          </Typography>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
