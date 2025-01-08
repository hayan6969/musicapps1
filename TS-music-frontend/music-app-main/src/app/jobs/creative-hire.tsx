"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
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

const cultureArea = [
  "North America",
  "Europe",
  "East Asia",
  "South Asia",
  "Ocenia",
  "West Asia and North Africa",
  "Africa",
  "Latin America",
];

interface JobFormData {
  projectTitle: string;
  category: string[];
  isHaveLyric: string;
  lyricLanguage?: string;
  musicUse: string[];
  cultureArea: string[];
  budget: {
    min: string;
    max: string;
  };
  timeFrame: {
    startDate: string;
    endDate: string;
  };
  description: string;
  publisherName: string;
  applicantName: string;
}

export function CreativeHire() {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<JobFormData>();

  const onSubmit = async (data: JobFormData) => {
    try {
      setIsLoading(true);

      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formattedTimeFrame = `${data.timeFrame.startDate} to ${data.timeFrame.endDate}`;

      const response = await fetch("http://localhost:3000/v1/job/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectTitle: data.projectTitle,
          category: data.category,
          isHaveLyric: data.isHaveLyric === "true",
          lyricLanguage: data.lyricLanguage,
          musicUse: data.musicUse,
          cultureArea: data.cultureArea,
          budget: `${data.budget.min}-${data.budget.max} USD`,
          timeFrame: formattedTimeFrame,
          description: data.description,
          publisherName: data.publisherName,
          applicantName: data.applicantName,
        }),
        
      });

      console.log("Payload to be sent:", {
        projectTitle: data.projectTitle,
        category: data.category,
        isHaveLyric: data.isHaveLyric === "true",
        lyricLanguage: data.lyricLanguage,
        musicUse: data.musicUse,
        cultureArea: data.cultureArea,
        budget: `${data.budget.min}-${data.budget.max} USD`,
        timeFrame: formattedTimeFrame,
        description: data.description,
        publisherName: data.publisherName,
        applicantName: data.applicantName,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          router.push("/login");
          throw new Error("Authentication expired. Please log in again.");
        }
        throw new Error(errorData.message || "Failed to create job");
      }

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Job created successfully!",
        life: 3000,
      });

      reset();
      router.push("/jobs");
    } catch (error) {
      console.error("Error creating job:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        life: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-row justify-center items-center !w-12/12 md:w-[50rem] overflow-auto scrollbar-none">
      <Toast ref={toast} />
      <form
        className="flex flex-col gap-2 px-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-row gap-8">
          <div className="w-96">
            <Typography
              variant="h4"
              color="blue-gray"
              className="pt-8 font-bold"
            >
              New Freelance Music Project
            </Typography>
            <p className="text-xs text-gray-700 font-medium">
              Create a brief to share your project requirements
            </p>
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
                Project Title
              </Typography>
              <Input
                {...register("projectTitle", {
                  required: "Project title is required",
                })}
                crossOrigin={""}
                size="lg"
                placeholder="Enter project title"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.projectTitle && (
                <span className="text-red-500 text-sm">
                  {errors.projectTitle.message}
                </span>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-semibold"
              >
                Work Content (Multiple Choice)
              </Typography>
              <div className="flex mt-0">
                {[
                  "Composition",
                  "Arrangement",
                  "Lyrics writing",
                  "Production",
                ].map((content) => (
                  <div key={content} className="flex items-center me-10">
                    <input
                      {...register("category")}
                      type="checkbox"
                      id={`category-${content.toLowerCase()}`}
                      value={content}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor={`category-${content.toLowerCase()}`}
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      {content}
                    </label>
                  </div>
                ))}
              </div>

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-2 font-semibold"
              >
                Does the music have lyrics?
              </Typography>
              <div className="flex mt-0">
                <div className="flex items-center me-4">
                  <input
                    {...register("isHaveLyric")}
                    type="radio"
                    value="true"
                    id="radio-yes"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="radio-yes"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    {...register("isHaveLyric")}
                    type="radio"
                    value="false"
                    id="radio-no"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                  <label
                    htmlFor="radio-no"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    No
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Lyrics Language (Optional)
                </label>
                <select
                  {...register("lyricLanguage", { required: "Lyrics language is required" })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 "
                >
                  <option defaultValue={"Select Language"}>
                    Select Language
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
              {/* <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Usage
                </label>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-2.5 "
                >
                  <option defaultValue={"Select Music Usage"}>
                    Select Music Usage
                  </option>

                  <option value="pop">Pop Music</option>
                  <option value="folk">Folk Music</option>
                  <option value="game">Game Music</option>
                  <option value="movie">Movie Music</option>
                  <option value="classical">Classical Music</option>
                  <option value="childrens">{"Children's Music"}</option>
                  <option value="scene">Scene Music</option>
                </select>
              </div> */}

              <label
                htmlFor="default"
                className="block text-sm font-semibold text-gray-900 "
              >
                Music Use to (Multiple Choice)
              </label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {musicUse.map((style, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      {...register("musicUse")}
                      type="checkbox"
                      id={`${style.toLowerCase()}-checkbox`}
                      value={style}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`${style.toLowerCase()}-checkbox`}
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      {style}
                    </label>
                  </div>
                ))}
              </div>
              <label
                htmlFor="default"
                className="block text-sm font-semibold text-gray-900 "
              >
                Music Culture Area
              </label>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {cultureArea.map((style, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      {...register("cultureArea")}
                      type="checkbox"
                      id={`${style.toLowerCase()}-checkbox`}
                      value={style}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={`${style.toLowerCase()}-checkbox`}
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      {style}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-1 font-semibold"
                >
                  Your Budget
                </Typography>
                <div className="flex flex-row justify-start items-center gap-1">
                  US$
                  <div className="max-w-[5rem]">
                    <input
                      {...register("budget.min", {
                        required: "Minimum budget is required",
                        min: {
                          value: 0,
                          message: "Minimum budget must be positive",
                        },
                      })}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                  <p className="px-2 mb-4">___</p>
                  <div className="max-w-[5rem]">
                    <input
                      {...register("budget.max", {
                        required: "Maximum budget is required",
                        min: {
                          value: 0,
                          message: "Maximum budget must be positive",
                        },
                      })}
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  </div>
                </div>

                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-1 font-semibold"
                >
                  Your Timeframe
                </Typography>
                <div className="flex gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Start Date</label>
                    <input
                      type="date"
                      {...register("timeFrame.startDate", {
                        required: "Start date is required",
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {errors.timeFrame?.startDate && (
                      <span className="text-red-500 text-sm">
                        {errors.timeFrame.startDate.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">End Date</label>
                    <input
                      type="date"
                      {...register("timeFrame.endDate", {
                        required: "End date is required",
                        validate: (value, formValues) => {
                          if (
                            formValues.timeFrame?.startDate &&
                            value < formValues.timeFrame.startDate
                          ) {
                            return "End date must be after start date";
                          }
                          return true;
                        },
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    {errors.timeFrame?.endDate && (
                      <span className="text-red-500 text-sm">
                        {errors.timeFrame.endDate.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-1 font-semibold"
                >
                  Publisher Name
                </Typography>
                <Input
                  {...register("publisherName", {
                    required: "Publisher name is required",
                  })}
                  crossOrigin={""}
                  size="lg"
                  placeholder="Enter publisher name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.publisherName && (
                  <span className="text-red-500 text-sm">
                    {errors.publisherName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-1 font-semibold"
                >
                  Applicant Name
                </Typography>
                <Input
                  {...register("applicantName", {
                    required: "Applicant name is required",
                  })}
                  crossOrigin={""}
                  size="lg"
                  placeholder="Enter your name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.applicantName && (
                  <span className="text-red-500 text-sm">
                    {errors.applicantName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-1 font-semibold"
                >
                  Project Description
                </Typography>
                <Textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Description must be at least 50 characters",
                    },
                  })}
                  className="w-[25rem] h-52"
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-start gap-4">
          <Button
            type="submit"
            className="w-[14rem] rounded-full border-black border-[0.01rem] hover:bg-blue-300 hover:shadow-none shadow-none"
            color="blue"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Music Project"}
          </Button>
          <Button
            type="button"
            onClick={() => router.back()}
            className="hover:bg-blue-gray-100 hover:rounded-full text-black w-[8rem] bg-transparent shadow-none hover:shadow-none"
            fullWidth
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex flex-row gap-6"></div>
        </div>
      </form>
    </section>
  );
}

export default CreativeHire;
