import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Avatar, Button } from "@material-tailwind/react";
import React from "react";

function TopMusicPlayer() {
  return (
    <div className="flex flex-row items-center justify-between gap-1 p-4 border-b-2 border-black/10">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          src={"https://docs.material-tailwind.com/img/face-4.jpg"}
          alt="avatar"
          size="sm"
        />
        <div className="flex flex-col items-start justify-center gap-0">
          <p className="text-xs">Stef Jack</p>
          <p className="text-md">Composer</p>
        </div>
        <div className="flex flex-col items-start justify-center gap-1">
          <p className="text-xs">Work Available</p>
          <p className="text-[0.7rem] font-bold">for the song</p>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <Button
            variant="gradient"
            size="sm"
            className="normal-case text-center text-[0.6rem] mt-2 w-full"
          >
            Follow
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-1 items-center justify-center">
        <CurrencyDollarIcon height={30} width={30} className="mt-[0.5rem]" />
        <Button
          variant="outlined"
          size="sm"
          className="normal-case text-center text-[0.6rem] p-1 mt-2 w-full"
        >
          Get Touch
        </Button>
      </div>
    </div>
  );
}

export default TopMusicPlayer;
