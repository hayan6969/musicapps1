"use client";

import { IconButton, Button, Typography } from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function HeroAssets() {
  return (
    <div className="relative min-h-[55vh] w-full bg-[url('/image/background-assets-page.png')] bg-cover bg-no-repeat">
      <div className="grid min-h-[55vh] px-8">
        <div className="container relative z-10 my-auto mx-auto grid place-items-center text-center gap-5">
          <div className="flex flex-col">
            <h1 className="text-black text-[7rem] font-notoCondensed -mb-7">
              Browse Assets
            </h1>
            <p className="text-black text-[2rem] font-notoCondensed">
              Find the perfect asset for your next project
            </p>
          </div>
          <div className="flex flex-row gap-10 items-center">
            <Link href={"/share-work-sales-market"}>
              <Button
                variant="outlined"
                className="normal-case hover:bg-white"
                size="lg"
              >
                Sale Your Assets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAssets;
