import React from "react";
import { Card, CardBody, Avatar, Typography } from "@material-tailwind/react";

import { PlayIcon, CheckIcon } from "@heroicons/react/24/solid";
interface CategoryCardProps {
  id: number;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName?: string;
}
interface ClickProps {
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  // value: any;
}

function SelectableBox({
  id,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
}: CategoryCardProps) {
  const [selected, setSelected] = React.useState(false);
  const handleClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelected(!selected);
  };
  return (
    <>
      <button className="" onClick={(e) => handleClick(e, id)}>
        <Card
          className={`relative grid min-h-[5rem] w-[17rem] overflow-hidden hover:shadow-xl shadow-md border-2`}
        >
          <div
            className={`absolute inset-0 h-full w-full ${
              selected ? "" : "bg-white"
            }`}
          />
          <CardBody className={`relative flex flex-col justify-between p-3`}>
            <div className={`grid grid-cols-3`}>
              <div className={`col-span-2 flex flex-col gap-2`}>
                <div className="flex items-center gap-2">
                  <div className="flex flex-row gap-2">
                    <Avatar src={imgSong} alt="avatar" variant="rounded" />
                    <div>
                      <Typography
                        variant="small"
                        color="black"
                        className="font-bold text-start text-xs pt-1"
                      >
                        {singerName}
                      </Typography>
                      <Typography
                        variant="small"
                        color="black"
                        className="font-bold text-[0.6rem] pt-[0.1rem]"
                      >
                        {songName}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {composerName ? (
                    <>
                      <Avatar src={imgComposer} alt="avatar" size="sm" />
                      <Typography variant="h6">{composerName}</Typography>
                      <Typography
                        variant="small"
                        color="black"
                        className="font-normal"
                      >
                        Composer
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="small"
                        color="black"
                        className={`mt-[0.2rem] text-xs`}
                      >
                        Composer for the song
                      </Typography>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div className="flex flex-col">
                  <PlayIcon className="h-10 w-10" />
                </div>
                {selected ? (
                  <>
                    <div className=" absolute bottom-0 right-0 mx-[0.7rem]">
                      <CheckIcon className="w-8 h-8 font-bold" />
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </button>
    </>
  );
}
export default SelectableBox;
