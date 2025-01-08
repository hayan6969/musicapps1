"use client";

import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function HeroUSer() {
  return (
    <div className="relative min-h-[40vh] w-full bg-[url('/image/home.jpg')] bg-cover bg-no-repeat">
      <div className="absolute inset-0 h-full w-full bg-gray-900/60" />
      <div className="grid min-h-[40vh] px-8">
        {/* <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center">
          <p className="text-white text-5xl font-extralight lg:max-w-3xl">
            A professional community for Composers, Lyricist, and Producers
          </p>
          <p className="text-white mt-1 mb-10 text-xl font-extralight w-full md:max-w-full lg:max-w-2xl">
            Let more record companies, singers, game companies, movie companies,
            and entertainment companies discover for you
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default HeroUSer;
