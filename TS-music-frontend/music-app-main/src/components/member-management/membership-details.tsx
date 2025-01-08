import { Button } from "@material-tailwind/react";
import React from "react";

function MembershipDetails() {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-col gap-2 w-[24rem]">
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">
              Membership Type
            </h5>
            <p className="text-base font-bold text-md">Company</p>
          </div>
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">Term</h5>
            <p className="text-base font-bold text-md">1 Year</p>
          </div>
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">Price</h5>
            <p className="text-base font-bold text-md">
              <span className="text-blue-300">$118.80</span> Paid
            </p>
          </div>
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">
              Membership Status
            </h5>
            <p className="text-base font-bold text-md">Available</p>
          </div>
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">Member Since</h5>
            <p className="text-base font-bold text-md">September 18th, 2024</p>
          </div>
          <div className="flex flex-row justify-between">
            <h5 className="text-xl font-medium leading-tight ">
              Renewal due on
            </h5>
            <p className="text-base font-bold text-md">September 17th, 2025</p>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-end justify-end">
          <Button
            variant="filled"
            size="md"
            color="blue"
            className="text-black text-center cursor-pointer font-semibold normal-case"
          >
            Renewal Now
          </Button>
        </div>
      </div>
    </>
  );
}

export default MembershipDetails;
