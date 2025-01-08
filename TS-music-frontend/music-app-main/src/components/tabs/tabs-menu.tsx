"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React from "react";
import FilterExploreParts from "../filters/filter-explore-part";
import ExploreContent from "../explore/explore-content";

export function TabsMenu() {
  const data = [
    {
      label: "For You",
      value: "for-you",
      desc: <ExploreContent />,
    },
    {
      label: "Following",
      value: "following",
      desc: <ExploreContent />,
    },
  ];

  return (
    <section className="flex justify-start px-3 w-full">
      <Tabs id="custom-animation" value={"for-you"} className="w-full mb-16">
        <div className="flex flex-row items-start mb-2">
          <TabsHeader
            className="flex justify-end bg-transparent h-12 md:w-[20rem] border border-white/25 bg-opacity-90 font-notoSemibold"
            indicatorProps={{
              className:
                "shadow-none border-b-2 border-black rounded-none !text-gray-900",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} className="text-sm">
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <FilterExploreParts />
        </div>
        <div className="border-t-2 border-black/10 w-full"></div>
        <TabsBody className="flex flex-row gap-1">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-0 py-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
}

export default TabsMenu;
