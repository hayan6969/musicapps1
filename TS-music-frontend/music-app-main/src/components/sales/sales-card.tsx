import React from "react";
import SalesDetailItem from "./sales-detail-item";

function SalesCard() {
  return (
    <>
      <div className="block bg-white border-2 border-black text-surface shadow-secondary-1 w-[62.5rem]">
        <div className="border-b-2 bg-gray-200 border-neutral-100 px-6 py-3">
          <div className="flex justify-between">
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">#1212676</p>
              <p className="text-sm font-bold">Feb 8, 2024</p>
            </div>
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">Buyer: Tom Jhonson</p>
              <p className="text-sm font-bold">$400.00</p>
            </div>
          </div>
        </div>
        <SalesDetailItem />
        <hr className="border-black border-1" />
        <SalesDetailItem />
      </div>
    </>
  );
}

export default SalesCard;
