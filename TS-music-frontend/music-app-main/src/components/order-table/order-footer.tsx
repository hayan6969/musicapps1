import React from "react";

function OrderFooter() {
  return (
    <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
      <div className="flex max-sm:flex-col-reverse items-center">
        <p className="font-normal text-xl py-10 leading-8 text-gray-500 sm:pl-8">
          Total Income
        </p>
      </div>
      <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
        $200.00
      </p>
    </div>
  );
}

export default OrderFooter;
