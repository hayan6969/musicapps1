import OrderWorking from "@/components/order-table/order-working";
import OrderInfo from "@/components/order/order-info";
import OrderInfoCard from "@/components/order/order-info-card";
import OrderOngoingCard from "@/components/order/order-ongoing-card";
import OrderUploadedWorks from "@/components/order/order-uploaded-works";
import OrderUploadedWorksCard from "@/components/order/order-uploaded-works-card";
import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function WorkingOrder() {
  const isCustomer = useSelector((state: RootState) => state.offer.isCustomer);
  return (
    <>
      <div className="flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {isCustomer ? (
              <>
                <OrderInfoCard />
                <OrderUploadedWorksCard />
              </>
            ) : (
              <>
                <OrderOngoingCard />
                <OrderOngoingCard />
                <OrderOngoingCard />
                <OrderOngoingCard />
                <OrderOngoingCard />
                <OrderOngoingCard />
              </>
            )}
          </div>
        </div>
      </div>
      {/* <OrderWorking /> */}
      {/* <div className="px-3 md:px-11 flex items-center justify-between max-sm:flex-col-reverse">
        <div className="flex max-sm:flex-col-reverse items-center">
          <p className="font-normal text-xl py-10 leading-8 text-gray-500 sm:pl-8">
            Total Income
          </p>
        </div>
        <p className="font-medium text-xl leading-8 text-black max-sm:py-4">
          $200.00
        </p>
      </div> */}
    </>
  );
}

export default WorkingOrder;
