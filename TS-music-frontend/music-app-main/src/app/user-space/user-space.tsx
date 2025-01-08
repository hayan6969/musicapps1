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
  Avatar,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Link from "next/link";
import { CATEGORIES, JOBS_PROPS } from "@/dummy/example";
import OriginalBox from "@/components/music-box/original-box";
import UserInfo from "@/components/user-space/user-info";
import Works from "@/app/user-space/works";
import Collections from "@/app/user-space/collections";
import MyFollowing from "./my-following";
import { useSearchParams } from "next/navigation";
import MyAssets from "./my-assets";
import MusicPlayerDialog from "@/components/music-player/music-player-dialog";

export function UserSpace() {
  const section = [
    {
      label: "Works",
      value: "works",
      desc: <Works />,
    },
    {
      label: "My Assets",
      value: "my-assets",
      desc: <MyAssets />,
    },
    {
      label: "My following",
      value: "my-following",
      desc: <MyFollowing />,
    },
    {
      label: "My Liked",
      value: "my-liked",
      desc: "My Liked",
    },
    {
      label: "My Collection",
      value: "my-collection",
      desc: <Collections />,
    },
    {
      label: "Draft",
      value: "draft",
      desc: "Draft",
    },
  ];
  const searchParams = useSearchParams();
  let sectionActive = searchParams.get("section");
  if (sectionActive == null) {
    sectionActive = "works";
  }
  return (
    <div className="mx-auto min-h-[60rem]" key={sectionActive}>
      <MusicPlayerDialog />
      <div className="grid grid-cols-12 pl-10">
        <UserInfo />
        <div className="col-start-4 col-span-9 min-h-screen w-full">
          <div className="p-4">
            <div className="flex flex-row gap-4 mb-4">
              <Tabs
                id="custom-animation"
                value={sectionActive}
                className="w-full"
              >
                <TabsHeader
                  className="bg-transparent space-x-2"
                  indicatorProps={{
                    className: "bg-gray-900/10 shadow-md !text-gray-900",
                  }}
                >
                  {section.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      className="font-semibold text-sm w-fit"
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody
                  animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                  }}
                >
                  {section.map(({ value, desc }) => (
                    <TabPanel key={value} value={value} className="p-0 pt-4">
                      <div className="max-w-fit">{desc}</div>
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSpace;
