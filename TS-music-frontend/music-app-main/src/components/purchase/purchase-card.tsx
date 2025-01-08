import React from "react";
import PurchaseDetailItem from "./purchase-detail-item";

function PurchaseCard() {
  return (
    <>
      <div className="block bg-white border-2 border-black text-surface shadow-secondary-1 w-[43.75rem]">
        <div className="border-b-2 bg-gray-200 border-neutral-100 px-6 py-3">
          <div className="flex justify-between">
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">#1212676</p>
              <p className="text-sm font-bold">Feb 8, 2024</p>
            </div>
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">Buyer: Tom Jhonson</p>
              <p className="text-sm font-bold">$200.00</p>
            </div>
          </div>
        </div>
        <PurchaseDetailItem />
      </div>
    </>
  );
}

export default PurchaseCard;
