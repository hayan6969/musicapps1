import React from "react";

function SalesDetailItem() {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <h5 className="text-xl font-medium leading-tight ">Everytime</h5>
            <p className="text-base">By Yang Ting</p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center text-blue-500">
            <h5 className="text-xl font-medium leading-tight ">$200.00</h5>
          </div>
        </div>
      </div>
      <hr className="border-black border-1" />
    </>
  );
}

export default SalesDetailItem;
