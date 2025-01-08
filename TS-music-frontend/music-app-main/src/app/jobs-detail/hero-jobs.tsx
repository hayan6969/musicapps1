"use client";

import {
  IconButton,
  Button,
  Typography,
  Avatar,
  Textarea,
} from "@material-tailwind/react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Drawer } from "@material-tailwind/react";
import SmallMusicBox from "@/components/small-music-box";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CATEGORIES, SELECTED } from "@/dummy/example";

function HeroJobs() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const handleOpen = () => setOpenPopup(!openPopup);
  return (
    <>
      <div className="relative min-h-[28vh] w-full">
        <div className="absolute inset-0 h-full w-full" />
        <div className="grid min-h-[20vh] px-8 py-4">
          <div className="flex flex-col z-10 justify-center items-center text-center">
            <Avatar
              src={"https://docs.material-tailwind.com/img/face-2.jpg"}
              alt="avatar"
              className="mb-2 w-[12rem] h-[12rem]"
            />
            <Typography variant="h3" color="black" className="mb-1">
              Arrangement of popular songs
            </Typography>
            <Typography
              variant="lead"
              color="black"
              className="mb-2 w-full md:max-w-full lg:max-w-2xl"
            >
              Joe Cole
            </Typography>
            <div className="flex items-center gap-4">
              <Button
                variant="gradient"
                color="blue"
                className="hover:scale-110 w-[12rem]"
                onClick={openDrawer}
              >
                APPLY
              </Button>
              <StarIcon
                color="black"
                width={28}
                height={28}
                className="cursor-pointer hover:scale-125"
              />
            </div>
          </div>
        </div>
      </div>

      <React.Fragment>
        <Drawer
          placement="right"
          open={open}
          onClose={closeDrawer}
          overlay={false}
          className={`shadow-xl rounded-md overflow-scroll ${
            open ? "min-w-[46.5rem]" : ""
          }`}
        >
          <div className="flex items-center justify-between px-4 pb-2 py-4 fixed z-50 border-0 bg-black w-[45.6rem]">
            <Typography variant="small" className="font-bold" color="white">
              Choose your projects to Recruiter
            </Typography>
            <IconButton variant="text" color="white" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div className="pt-[4.5rem]"></div>
          <div className="flex items-center justify-center">
            {/* <div className="grid grid-cols-1 gap-6"> */}
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((props, key) => (
                <SmallMusicBox key={key} {...props} />
              ))}
            </div>
          </div>

          <div className="flex justify-end p-4">
            <Button onClick={handleOpen} variant="gradient">
              Confirm Application
            </Button>
          </div>
        </Drawer>
      </React.Fragment>

      {/* Pop Up */}
      {/* <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button> */}
      <Dialog size="lg" open={openPopup} handler={handleOpen}>
        <DialogHeader className="font-light text-md flex justify-center">
          Carl Anderson is seeking arrangers and composer
        </DialogHeader>
        <DialogBody className="p-0">
          <Typography
            variant="h4"
            className="flex justify-center font-bold mb-2"
            color="black"
          >
            Apply with your Profile
          </Typography>
          <Typography
            variant="small"
            className="flex justify-center mb-2"
            color="blue-gray"
          >
            Your Application will be submitted along with a preview of your
            Profile and projects.
          </Typography>
          <div className="flex flex-row justify-between p-4 gap-6">
            <div className="flex flex-col border-2 p-0 border-black rounded-md min-h-[20rem] min-w-[25.5rem] max-w-[25.5rem] mb-2">
              <div className="">
                <img
                  className="h-fit max-h-[8rem] w-full rounded-md object-cover object-center shadow-md shadow-blue-gray-900/50"
                  src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                  alt="nature image"
                />
                <Avatar
                  variant="circular"
                  alt="user 1"
                  size="xl"
                  className="absolute object-cover object-center top-[11.5rem] left-[3rem] border-2 border-black hover:z-10 focus:z-10"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
              </div>
              <div className="pl-[6.5rem]">
                <Typography variant="h5" className="p-2" color="blue-gray">
                  Joe Cole
                </Typography>
              </div>
              <div className="mt-1 my-2 min-h-[10rem] p-2">
                <div className="grid grid-cols-1 gap-2">
                  <div className="grid grid-cols-2 gap-3">
                    {SELECTED.map((props, key) => (
                      <SmallMusicBox key={key} {...props} pocketSize={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-2  p-2">
              <Textarea label="Message" className="w-[26rem] h-[15rem]" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
          <Button variant="gradient" onClick={handleOpen} className="w-[20rem]">
            <span>Submit Application</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default HeroJobs;
