"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from "next/navigation";
import { Toast } from "primereact/toast";
import Image from "next/image";
import {
  Card,
  CardBody,
  CardFooter,
  Avatar,
  Typography,
  IconButton,
  Textarea,
  Chip,
} from "@material-tailwind/react";

import { MapPinIcon, StarIcon as StaredIcon } from "@heroicons/react/24/solid";
import { StarIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Badge, Button } from "@material-tailwind/react";
import Link from "next/link";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
// import { CATEGORIES, SELECTED } from "@/dummy/example";
import { CATEGORIES, SELECTED } from "@/conf/jobsprops";

import PocketsizeBox from "@/components/music-box/pocketsize-box";
import SelectableBox from "./music-box/selectable-box";

interface CategoryCardProps {
  title: string;
  workcontent: string;
  musicculture: string;
  descriptionjob: string;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName: string;
  savedJobs?: boolean | false;
  appliedJobs?: boolean | false;
  activeJobs?: boolean | false;
  id: string;
  username: string;
  fotoprofile: string;
  category: string[];
  musicUse: string[];
  cultureArea: string[];
  lyricLanguage: string;
  budget: string[];
  timeFrame: string;
  applicantName: string;
  createdAt: string;
}

function CardJobs({
  title,
  workcontent,
  musicculture,
  descriptionjob,
  imgSong,
  singerName,
  songName,
  imgComposer,
  composerName,
  savedJobs,
  appliedJobs,
  activeJobs,
  id,
  username,
  fotoprofile,
  category,
  musicUse,
  cultureArea,
  lyricLanguage,
  budget,
  timeFrame,
  applicantName,
  createdAt,
}: CategoryCardProps) {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [openSmallbox, setopenSmallbox] = React.useState(false);
  const [openReview, setopenReview] = React.useState(false);
  const handleOpen = () => setOpenPopup(!openPopup);
  const handleOpenSmallbox = () => setopenSmallbox(!openSmallbox);
  const handleOpenReview = () => setopenReview(!openReview);
  // const handleSubmit = () => {
  //   setopenSmallbox(!openSmallbox);
  //   setopenReview(!openReview);
  // };

  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    const musicIds = SELECTED.map((item) => item.id);
    // const message = document.querySelector("textarea")?.value || "";


    console.log(musicIds);
    console.log(message);
  
    // if (musicIds.length < 2) {
    //   alert("Please select at least 2 pieces of music.");
    //   return;
    // }
  
    const payload = { musicIds, message };
    const token = localStorage.getItem("token"); // Ambil token
  
    console.log("Token:", token); // Debug token
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/v1/job/apply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pastikan token dikirim
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit application");
      }
  
      const result = await response.json();
      console.log("Application submitted successfully:", result);
      alert("Application submitted successfully!");
      // toast.current?.show({
      //   severity: "success",
      //   summary: "Success",
      //   detail: "Job created successfully!",
      //   life: 3000,
      // });

      setopenSmallbox(!openSmallbox);
      setopenReview(!openReview);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };
  

  const [selected, setSelected] = React.useState(false);
  const handleClick = () => {
    setSelected(!selected);
  };
  if (selected) {
    console.log("selected aa");
  }
  return (
    <>
      <Card className="relative grid min-h-[10rem] max-h-[17rem] w-[21rem] overflow-hidden hover:shadow-xl shadow-md border-2">
        <div className="absolute inset-0 h-full w-full bg-white" />
        <CardBody className="relative flex flex-col justify-between p-3">
          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <div className="flex flex-row gap-4">
                <Avatar src={fotoprofile} size="sm" alt="avatar" />
                <div>
                  {/* <Badge content="Pro" color="blue" withBorder>
                  <Button
                    variant="outlined"
                    size="sm"
                    className="p-1 cursor-default"
                  >
                    Camila Neus
                  </Button>
                </Badge> */}
                  <div className="flex items-center flex-row gap-1">
                    <Typography
                      variant="small"
                      color="black"
                      className="font-bold text-xs pt-1"
                    >
                      {username}
                    </Typography>
                    {/* <Typography
                    variant="small"
                    color="white"
                    className="font-normal text-[0.6rem] pt-1 border-2 rounded-full p-1 bg-[#3FA2F6]/90"
                  >
                    PRO
                  </Typography> */}
                    <span className=" text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                    <div className="flex flex-row pl-[0.5rem]">
                      <MapPinIcon height={12} color="black" />
                      <Typography
                        variant="small"
                        color="black"
                        className="text-[0.4rem] pt-[0.1rem] font-bold"
                      >
                        United Kingdom
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    variant="small"
                    color="black"
                    className="font-bold text-[0.6rem] pt-[0.1rem]"
                  >
                    {"Manager of Entertaiment Company A"}
                  </Typography>
                </div>
              </div>
              {savedJobs ? (
                <div className="">
                  <StaredIcon
                    width={26}
                    height={26}
                    color="yellow"
                    stroke="black"
                    className="cursor-pointer hover:scale-125"
                  />
                </div>
              ) : appliedJobs || activeJobs == true || activeJobs == false ? (
                activeJobs == true ? (
                  <div className="group relative cursor-pointer py-2">
                    <EllipsisHorizontalIcon className="menu-hover rounded-full h-[1.9rem] cursor-pointer bg-gray-200 hover:bg-gray-300 hover:rounded-full text-black" />
                    <div className="invisible z-50 absolute group-hover:visible bg-white divide-gray-100 rounded-lg shadow w-[6rem] top-10 right-0 dark:bg-gray-700">
                      <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                        Copy Link
                      </a>
                      <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                        Edit
                      </a>
                      <a className="block px-2 py-2 hover:bg-gray-100 text-red-500 text-xs font-semibold tracking-wider">
                        Delete
                      </a>
                    </div>
                  </div>
                ) : activeJobs == false ? (
                  <div className="group relative cursor-pointer py-2">
                    <EllipsisHorizontalIcon className="menu-hover rounded-full h-[1.9rem] cursor-pointer bg-gray-200 hover:bg-gray-300 hover:rounded-full text-black" />
                    <div className="invisible z-50 absolute group-hover:visible bg-white divide-gray-100 rounded-lg shadow w-[6rem] top-10 right-0 dark:bg-gray-700">
                      <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                        Copy Link
                      </a>
                      <a className="block px-2 py-2 hover:bg-gray-100 text-xs font-semibold tracking-wider">
                        Re-activate
                      </a>
                      <a className="block px-2 py-2 hover:bg-gray-100 text-red-500 text-xs font-semibold tracking-wider">
                        Delete
                      </a>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                <div className="">
                  <StarIcon
                    width={26}
                    height={26}
                    color="black"
                    className="cursor-pointer hover:scale-125"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 mt-[0.3rem]">
              <Typography variant="small" className="font-bold" color="black">
                {title}
              </Typography>
              {/* <div className="flex flex-row">
                <MapPinIcon height={12} color="black" />
                <Typography
                  variant="small"
                  color="black"
                  className="text-[0.6rem] font-bold"
                >
                  anywhere
                </Typography>
              </div> */}
            </div>
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="black"
                className="font-normal text-[0.7rem]"
              >
                {`Work Content : ${workcontent}`}
              </Typography>
              <Typography
                variant="small"
                color="black"
                className="font-normal text-[0.7rem]"
              >
                {`Music Culture Region : ${musicculture}`}
              </Typography>
              <Typography
                variant="small"
                color="black"
                className="text-justify text-[0.6rem] max-w-[20rem] overflow-hidden text-ellipsis"
              >
                {descriptionjob?.length > 150
                ? `${descriptionjob.substring(0, 150)}...`
                : descriptionjob || "No description available"}
              </Typography>
            </div>
          </div>
          <div className="flex justify-between">
            <Typography
              variant="small"
              color="black"
              className="text-[0.6rem] mt-[0.6rem]"
            >
              {new Date(createdAt).toLocaleString()}
            </Typography>
            {/* <Link
              href={{ pathname: "/jobs-detail", query: { id: 1 } }}
              className="inline-block"
            > */}
            {appliedJobs ? (
              <Chip
                value="Applied 5 days ago"
                size="sm"
                className="text-[0.5rem] h-[1.4rem] text-black bg-blue-gray-100 normal-case mr-[1rem]"
              />
            ) : (
              // ""
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-2 p-1 text-[0.6rem] mt-[0.2rem]"
                onClick={handleOpen}
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            )}
            {/* </Link> */}
          </div>
          {activeJobs == true || activeJobs == false ? (
            <div className="flex justify-between pt-[0.4rem]">
              <Chip
                value="View Applications (15)"
                size="sm"
                className="text-[0.5rem] h-[1.4rem] text-black bg-blue-200 normal-case"
              />
            </div>
          ) : (
            ""
          )}
        </CardBody>
      </Card>

      <Dialog
        dismiss={{ outsidePress: false }}
        size="lg"
        open={openPopup}
        handler={handleOpen}
      >
        <DialogHeader className="font-light text-md flex justify-between items-start p-2">
          <div></div>
          <div className="flex flex-col z-10 justify-center items-center text-center gap-[0.1rem]">
            <Avatar
              src={fotoprofile}
              alt="avatar"
              size="lg"
              className=""
            />
            <Typography variant="h5" color="black" className="">
              {title}
            </Typography>
            <Typography
              variant="small"
              color="black"
              className="w-full md:max-w-full lg:max-w-2xl"
            >
              {username}
            </Typography>
            <div className="flex items-center gap-2">
              <Button
                variant="gradient"
                color="blue"
                size="sm"
                className="hover:scale-110 w-[8rem] h-[1.8rem] p-1"
                onClick={handleOpenSmallbox}
              >
                APPLY
              </Button>
              <StarIcon
                color="black"
                width={25}
                height={25}
                className="cursor-pointer hover:scale-125"
              />
            </div>
          </div>
          <div className="flex flex-row absolute mt-[3.5rem] right-[20rem] top-[2.7rem]">
            <MapPinIcon height={12} color="black" />
            <Typography
              variant="small"
              color="black"
              className="text-[0.6rem] font-bold"
            >
              United Kingdom
            </Typography>
          </div>
          <div className="">
            <IconButton variant="text" onClick={handleOpen}>
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
            <div></div>
            <div></div>
          </div>
        </DialogHeader>
        <DialogBody className="p-0 h-[27rem] overflow-y-scroll">
          <div className="flex flex-row justify-between px-4 py-1 gap-6">
            <div className="flex flex-col p-0 rounded-md min-h-[20rem] min-w-[25.5rem] max-w-[35.5rem] mb-2">
              <div className="max-w-screen-lg text-justify">
              <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                  {descriptionjob}
                </Typography>
              
                {/* <Typography variant="paragraph" color="blue-gray">
                  Tasks and Responsibilites
                </Typography>

                <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>

                <Typography variant="paragraph" color="blue-gray">
                  So what does the new record for the lowest level of winter ice
                  actually mean
                </Typography>

                <Typography className="my-[0.1rem] font-normal !text-gray-500 text-xs tracking-wider leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industrys standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </Typography> */}
                <div className="container mx-auto px-4 py-8">
                  <div className="w-full mb-10 md:flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="gradient"
                        color="blue"
                        size="sm"
                        className="hover:scale-110 w-[8rem] h-[1.8rem] p-1"
                        onClick={handleOpenSmallbox}
                      >
                        APPLY
                      </Button>
                      <StarIcon
                        color="black"
                        width={25}
                        height={25}
                        className="cursor-pointer hover:scale-125"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-2 p-2 w-[20rem] h-[27rem]">
              <div className="flex w-full max-h-screen border-2 border-gray-500 rounded-md">
                <div className="p-2">
                  <Typography variant="small" color="gray" className="text-xs">
                    Job Descriptions
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {category && category.length > 0 ? category.join(', ') : 'No categories'}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Music Cultural Area
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {cultureArea && cultureArea.length > 0 ? cultureArea.join(', ') : 'No culture'}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Lyrics Language
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {lyricLanguage}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Music Usage
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {musicUse && musicUse.length > 0 ? musicUse.join(', ') : 'No music use'}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Budget
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {budget}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Timeframe
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {timeFrame}
                  </Typography>
                  {/* <Typography variant="small" color="gray" className="text-xs">
                    Job Location
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    Anywhere
                  </Typography> */}
                  <Typography variant="small" color="gray" className="text-xs">
                    Aplicant Name
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {applicantName}
                  </Typography>
                  <Typography variant="small" color="gray" className="text-xs">
                    Job Posted
                  </Typography>
                  <Typography
                    variant="small"
                    color="black"
                    className="mb-2 font-bold"
                  >
                    {new Date(createdAt).toLocaleString()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        {/* <DialogFooter className="flex justify-center"> */}
        {/* <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button> */}
        {/* <Button variant="gradient" onClick={handleOpen} className="w-[20rem]">
            <span>Submit Application</span>
          </Button> */}
        {/* </DialogFooter> */}
      </Dialog>

      <Dialog
        dismiss={{ outsidePress: false }}
        size="md"
        open={openSmallbox}
        handler={handleOpenSmallbox}
      >
        <DialogHeader className="font-light text-md flex justify-between py-2 shadow-md">
          <div></div>
          <Typography
            variant="small"
            className="font-bold text-xs"
            color="black"
          >
            please select 2 pieces of music that are similar to the customers
            for reference
          </Typography>
          <IconButton variant="text" onClick={handleOpenSmallbox}>
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
        </DialogHeader>
        <DialogBody className="p-0 h-[30rem] overflow-y-scroll">
          <div className="flex items-center justify-center py-2">
            <div className="grid grid-cols-2 gap-4">
              {CATEGORIES.map((props, key) => (
                <SelectableBox key={key} {...props} />
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end py-2 px-6">
          <Button
            onClick={handleOpenReview}
            variant="gradient"
            color="blue"
            size="sm"
            className="hover:scale-100"
          >
            Confirm Application
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        dismiss={{ outsidePress: false }}
        size="lg"
        open={openReview}
        handler={handleOpenReview}
      >
        <DialogHeader className="flex flex-row justify-between font-light text-md gap-4 py-2 shadow-md">
          <div className=""></div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Avatar
              src={fotoprofile}
              alt="avatar"
              size="sm"
              className=""
            />
            <Typography variant="small" className="font-bold" color="black">
              {username}
            </Typography>
          </div>
          <IconButton variant="text" onClick={handleOpenReview}>
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
        </DialogHeader>
        <DialogBody className="p-2">
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
          <div className="flex flex-row justify-center gap-4">
            <div className="flex flex-col border-2 p-0 border-black/20 rounded-md min-h-[20rem] min-w-[25.5rem] max-w-[25.5rem] mb-2">
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
                  className="absolute object-cover object-center top-[11.5rem] left-[4rem] border-2 border-black hover:z-10 focus:z-10"
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
                      <PocketsizeBox key={key} {...props} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mb-2">
              <Textarea 
                value={message}
                onChange={handleMessageChange}
                label="Message" 
                className="h-92 !w-96" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center py-4 px-6">
          <Button
            onClick={() => handleSubmit(id)}
            variant="gradient"
            color="blue"
            size="sm"
            className="hover:scale-100"
          >
            Submit Application
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default CardJobs;
