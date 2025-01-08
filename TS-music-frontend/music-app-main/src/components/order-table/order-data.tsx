import React from "react";

function OrderData() {
  return (
    <>
      <div className="flex max-lg:flex-col items-center gap-8 lg:gap-24 px-3 md:px-11 h-[12rem]">
        <div className="grid grid-cols-4 w-full">
          <div className="col-span-4 sm:col-span-1">
            <img
              src="https://pagedone.io/asset/uploads/1705474774.png"
              alt=""
              className="max-sm:mx-auto"
            />
          </div>
          <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
              Hotel California
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
                  Justin
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Status
            </p>
            <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
              Delivered
            </p>
          </div>
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Delivery Expected by
            </p>
            <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
              23rd March 2024
            </p>
          </div>
        </div>
      </div>
      {/* separate order data */}
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
              src="https://pagedone.io/asset/uploads/1705474774.png"
              alt=""
              className="max-sm:mx-auto"
            />
          </div>
          <div className="col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 flex flex-col justify-center max-sm:items-center">
            <h6 className="font-manrope font-semibold text-2xl leading-9 text-black mb-3 whitespace-nowrap">
              Hotel California
            </h6>
            <p className="font-normal text-lg leading-8 text-gray-500 mb-8 whitespace-nowrap">
              By: Dust Studios
            </p>
            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
              <p className="font-semibold text-xl leading-8 text-black whitespace-nowrap">
                Price $120.00
              </p>
              <div className="flex flex-row gap-2">
                <p className="text-gray-500 whitespace-nowrap">Ordered by:</p>
                <p className="font-semibold text-black whitespace-nowrap">
                  Justin
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around w-full  sm:pl-28 lg:pl-0">
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Status
            </p>
            <p className="font-semibold text-lg leading-8 text-green-500 text-left whitespace-nowrap">
              Delivered
            </p>
          </div>
          <div className="flex flex-col justify-center items-start max-sm:items-center">
            <p className="font-normal text-lg text-gray-500 leading-8 mb-2 text-left whitespace-nowrap">
              Delivery Expected by
            </p>
            <p className="font-semibold text-lg leading-8 text-black text-left whitespace-nowrap">
              23rd March 2024
            </p>
          </div>
        </div>
      </div>
      {/* separate order data */}
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

export default OrderData;
