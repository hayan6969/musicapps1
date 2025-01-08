import React from "react";

function OrderWorking() {
  return (
    <>
      <div className="flex max-md:flex-col items-center justify-between px-3 md:px-11 bg-gray-200 h-[8rem]">
        <div className="data">
          <p className="font-medium text-lg leading-8 text-black whitespace-nowrap">
            Order : #10234998
          </p>
          <p className="font-medium text-lg leading-8 text-black mt-3 whitespace-nowrap">
            Order Payment : -
          </p>
        </div>
        {/* <div className="flex items-center gap-3 max-md:mt-5">
                <button className="rounded-full px-7 py-3 bg-white text-gray-900 border border-gray-300 font-semibold text-sm shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                  Show Invoice
                </button>
              </div> */}
      </div>
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

      <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 h-[12rem]">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-4 sm:col-span-1">
            <img
              src="https://pagedone.io/asset/uploads/1705474672.png"
              alt=""
              className="max-sm:mx-auto"
            />
          </div>
          <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
              Campagne Supernova
            </h6>
            <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
              By: Dust Studios
            </p>
            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
              <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                Price $80.00
              </p>
              <div className="flex flex-row gap-2">
                <p className="text-gray-500 whitespace-nowrap">Ordered by:</p>
                <p className="font-semibold text-black whitespace-nowrap">
                  Martin
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full sm:pl-28 lg:pl-0">
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Status
            </p>
            <p className="font-semibold text-lg leading-8 text-orange-500 text-left whitespace-nowrap">
              In Progress
            </p>
          </div>
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Delivery Expected by
            </p>
            <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
              2nd October 2024
            </p>
          </div>
        </div>
      </div>
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

export default OrderWorking;
