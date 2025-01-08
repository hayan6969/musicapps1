"use client";

import MemberManagementCard from "@/components/member-management/member-management-card";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Input,
  Radio,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export function ContactUsPage() {
  return (
    <div className="flex flex-row h-[90vh]">
      <div className="flex flex-col w-6/12 justify-center items-center gap-10">
        <Typography variant="h1" color="blue-gray">
          Contact Us
        </Typography>
        <img
          src={`image/contact-us.jpg`}
          alt="contact-us"
          className="object-cover h-[30rem] w-[30rem]"
        />
      </div>
      <section className="grid text-center w-6/12 h-[90vh] items-center p-8">
        <div>
          <form action="#" className="mx-auto max-w-[24rem] text-left">
            <div className="flex flex-col">
              <Radio
                defaultChecked
                crossOrigin={""}
                name="type"
                ripple={false}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                label={
                  <Typography
                    color="blue-gray"
                    className="font-normal text-black text-sm"
                  >
                    Improvement Suggestions
                  </Typography>
                }
              />
              <Radio
                defaultChecked
                crossOrigin={""}
                name="type"
                ripple={false}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                label={
                  <Typography
                    color="blue-gray"
                    className="font-normal text-black text-sm"
                  >
                    Bussiness Cooperation
                  </Typography>
                }
              />
              <Radio
                defaultChecked
                crossOrigin={""}
                name="type"
                ripple={false}
                className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                label={
                  <Typography
                    color="blue-gray"
                    className="font-normal text-black text-sm"
                  >
                    Sponsor Us
                  </Typography>
                }
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Email
                </Typography>
              </label>
              <Input
                crossOrigin={""}
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                className="rounded-lg !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div className="mb-6">
              <div className="flex flex-row justify-between">
                <label htmlFor="password">
                  <Typography
                    variant="small"
                    className="block font-medium text-gray-900"
                  >
                    Description
                  </Typography>
                </label>
              </div>
              <Textarea className="!h-[10rem]" />
            </div>
            <Button
              color="gray"
              size="lg"
              className="mt-6 normal-case rounded-none"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactUsPage;
