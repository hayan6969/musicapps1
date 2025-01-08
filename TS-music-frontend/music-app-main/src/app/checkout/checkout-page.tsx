import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import CartSection from "@/components/checkout/cart-section";
import PaymentSection from "@/components/checkout/payment-section";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function CheckoutPage() {
  const [activeTab, setActiveTab] = React.useState("cart");
  const data = [
    {
      label: "Cart (2)",
      value: "cart",
      desc: <CartSection />,
    },
    {
      label: "Payment",
      value: "payment",
      desc: <PaymentSection />,
    },
  ];
  return (
    <div className="p-4">
      <Link href={"/assets"} className="flex flex-row gap-1 items-center w-fit">
        <Button
          size="sm"
          variant="text"
          className="flex items-center gap-2 p-1 text-md normal-case mt-[0.2rem]"
        >
          <ArrowUturnLeftIcon className="h-4 w-4" />
          Continue Shopping
        </Button>
      </Link>
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 max-w-lg"
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
              className={activeTab === value ? "text-gray-900" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default CheckoutPage;
