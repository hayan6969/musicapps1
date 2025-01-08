import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import React from "react";
import OrderCanceled from "../order-table/order-canceled";
import OrderTable from "../order-table/order-table";
import WorkingOrder from "@/app/order/all-order";

function OriginalTabs() {
  const section = [
    {
      label: "Working",
      value: "working",
      desc: <WorkingOrder />,
    },
    {
      label: "Completed",
      value: "complete",
      desc: <OrderTable />,
    },
    {
      label: "Canceled",
      value: "canceled",
      desc: <OrderCanceled />,
    },
  ];
  return (
    <>
      <Tabs
        id="custom-animation"
        value="working"
        className="w-full max-w-7xl mx-auto px-4 md:px-8"
      >
        <TabsHeader
          className="bg-transparent"
          indicatorProps={{
            className: "!text-indigo-600",
          }}
        >
          {section.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className="font-bold text-lg leading-8 cursor-pointer hover:text-indigo-800 w-[10rem]"
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
              <div className="max-w-fit mt-4">{desc}</div>
              {/* <div className="mt-7 border border-gray-300">{desc}</div> */}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </>
  );
}

export default OriginalTabs;
