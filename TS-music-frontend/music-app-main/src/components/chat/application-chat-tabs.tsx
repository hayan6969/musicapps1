import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ListChat from "./list";

export function ApplicationChatTabs() {
  const [activeTab, setActiveTab] = React.useState("inbox-applications");
  const data = [
    {
      label: "Inbox (0)",
      value: "inbox-applications",
      desc: <ListChat listChat={[]} />,
    },
    {
      label: "Shortlist (0)",
      value: "shortlist",
      desc: "",
    },
    {
      label: "Archive (0)",
      value: "archive",
      desc: "",
    },
  ];
  return (
    <Tabs value={activeTab}>
      <p className="px-4 py-2 text-xs font-semibold text-gray-700">
        APPLICATIONS
      </p>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[24rem] max-w-[24rem]"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={
              activeTab === value ? "text-gray-900 w-[24rem] max-w-[24rem]" : ""
            }
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className="w-[24rem] max-w-[24rem] p-0"
          >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
