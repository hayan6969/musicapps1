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

export function MyProjects() {
  return (
    <section className="flex flex-row justify-center items-center my-8">
      <form className="flex flex-col gap-2 border-l-2 border-l-gray-300 border-r-2 border-r-gray-300 px-8">
        <div className="flex flex-row gap-8">
          <div className="w-96">
            <Typography
              variant="h5"
              color="blue-gray"
              className="pt-8 font-bold"
            >
              Your Project
            </Typography>
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
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-2 font-semibold"
                >
                  Category
                </Typography>
                <p className="text-xs text-gray-700 font-medium">
                  Select up to two Categories that best describe your projects
                </p>
                <div className="flex mt-0">
                  <div className="flex items-center me-4">
                    <input
                      id="inline-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Produce
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-2-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-2-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Compose
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-3-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-3-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Write Lyrics
                    </label>
                  </div>
                </div>
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
                    id="inline-yes"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="inline-yes"
                    className="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-no"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                  />
                  <label
                    htmlFor="inline-no"
                    className="ms-2 text-sm font-medium text-gray-900 "
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
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option selected>Select Language</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-2 font-semibold"
                >
                  Your Budget
                </Typography>
                <p className="text-xs text-gray-700 font-medium">
                  We will do our best to recommend creatives in your budget
                  range
                </p>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-1"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-1"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$5-100
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-2"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-2"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$500-1,000
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-3"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-3"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$5,000-10,000
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-4"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-4"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$100-250
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-5"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-5"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$1,000-2,500
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-6"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-6"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$10,000-25,000
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-7"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-7"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$250-500
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-8"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-8"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$2,500-5,000
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-checkbox-9"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label
                        htmlFor="inline-checkbox-9"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        US$25,000+
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-2 font-semibold"
                >
                  Your Wireframe
                </Typography>
                <p className="text-xs text-gray-700 font-medium">
                  When do you want this project completed by?
                </p>
                <div className="flex flex-col gap-2 mt-0">
                  <div className="flex items-center me-4">
                    <input
                      id="inline-wireframe-1"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-wireframe-1"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Now
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-wireframe-2"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-wireframe-2"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Within the next few weeks
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-wireframe-3"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-wireframe-3"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      In a month
                    </label>
                  </div>
                  <div className="flex items-center me-4">
                    <input
                      id="inline-wireframe-4"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="inline-wireframe-4"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Over a month
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Select Preferred Location (Optional)
                </label>
                <p className="text-xs text-gray-700 font-medium">
                  Note: using this filter can limit the quality of
                  recommendations.
                </p>
                <select
                  id="default"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option selected>Select countries / regions</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-semibold"
                >
                  Description
                </Typography>
                <p className="text-xs text-gray-700 font-medium">
                  Give more details about your project
                </p>
                <Textarea
                  className="w-[25rem] h-[15rem]"
                  label="Describe your project here..."
                />
              </div>
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

export default MyProjects;
