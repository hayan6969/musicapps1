"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Badge,
} from "@material-tailwind/react";
import Freelance from "@/app/jobs/freelance";
import CreativeHire from "@/app/jobs/creative-hire";
import SavedJobs from "@/app/jobs/saved-jobs";
import MyProjects from "@/app/jobs/my-projects";

export function JobsPage() {
  const data = [
    {
      label: "Freelance(18)",
      value: "freelance",
      desc: <Freelance />,
    },
    {
      label: "Creative for Hire",
      value: "creative",
      desc: <CreativeHire />,
    },
    {
      label: "Saved Jobs",
      value: "saved",
      desc: <SavedJobs />,
    },
    {
      label: "My Project(Post Job) (1)",
      value: "jobs",
      desc: <MyProjects />,
    },
  ];

  return (
    <section className="flex justify-center min-h-screen p-4">
      <Tabs
        id="custom-animation"
        value="freelance"
        className="mx-2 max-w-7xl w-full mb-16 "
      >
        {/* <TabsHeader className="h-10 !w-12/12 md:w-[50rem] border border-white/25 bg-opacity-90"> */}
        <TabsHeader className="h-10 !w-12/12 md:w-[55rem] border border-white/25 bg-opacity-90">
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value} className="p-0 pt-4">
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </section>
  );
}

export default JobsPage;
