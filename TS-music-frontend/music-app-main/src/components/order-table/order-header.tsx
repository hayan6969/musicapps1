import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { invoiceDialog } from "@/redux/features/offer/offerSlice";

function OrderHeader() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11 bg-gray-200 h-[8rem]">
        <div className="data">
          <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
            Order : #10234987
          </p>
          <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
            Order Payment : 18th march 2024
          </p>
        </div>
        <div className="flex items-center gap-3 max-md:mt-5">
          <button
            onClick={() => dispatch(invoiceDialog())}
            className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400"
          >
            Show Invoice
          </button>
        </div>
      </div>
      {/* separate order header */}
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="1216"
        height="2"
        viewBox="0 0 1216 2"
        fill="none"
      >
        <path d="M0 1H1216" stroke="#D1D5DB" />
      </svg>
    </>
  );
}

export default OrderHeader;
