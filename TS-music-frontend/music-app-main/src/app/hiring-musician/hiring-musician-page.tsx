"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
} from "@material-tailwind/react";
import HiringMusician from "@/app/assets/hiring-musician";
import FilterContent from "@/components/assets/filter-content";
import { filterContent, filterMusicUsage } from "@/default/filter";
import FilterMusicUsage from "@/components/assets/filter-music-usage";
import FindCreatives from "@/app/assets/find-creatives";
import MyFreelanceProjects from "@/app/assets/my-freelance-projects";
import NewFreelanceProject from "@/app/assets/new-freelance-project";
import React from "react";
import Sidebar from "@/components/sidebar/sidebar";

export function HiringMusicianPage() {
  const [section, setSection] = React.useState("hiring-musician");
  const data = [
    {
      label: "Hiring Musician",
      value: "hiring-musician",
      desc: <HiringMusician />,
    },
    {
      label: "Find Creatives",
      value: "find-creatives",
      desc: <FindCreatives />,
    },
    // {
    //   label: "My Freelance Projects",
    //   value: "my-freelance-projects",
    //   desc: <MyFreelanceProjects />,
    // },
    // {
    //   label: "New Freelance Project",
    //   value: "new-freelance-project",
    //   desc: <NewFreelanceProject />,
    // },
  ];

  return (
    <section className="flex justify-center min-h-screen px-4 py-2 gap-4">
      <Sidebar />
      <Tabs id="custom-animation" value={section} className="w-full mb-16">
        <div className="flex ml-[7rem] items-center mb-2">
          {/* <TabsHeader className="flex justify-end bg-transparent h-10 md:w-[50rem] border border-white/25 bg-opacity-90"> */}
          <TabsHeader
            className="flex justify-end bg-transparent h-10 md:w-[50rem] border border-white/25 bg-opacity-90"
            indicatorProps={{
              className: "bg-gray-900/10 shadow-md !text-gray-900",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab key={value} value={value} className="text-sm">
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>
        <div className="border-t-2 border-black/10"></div>
        <TabsBody className="flex flex-row gap-4">
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-0">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
}

export default HiringMusicianPage;
