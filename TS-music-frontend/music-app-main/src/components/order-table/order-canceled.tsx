import React from "react";
import OrderCancelCard from "../order/order-cancel-card";

function OrderCanceled() {
  return (
    <>
      <div className="flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <OrderCancelCard />
            <OrderCancelCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderCanceled;
