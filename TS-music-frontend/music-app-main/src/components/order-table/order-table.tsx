import React from "react";
import OrderHeader from "./order-header";
import OrderData from "./order-data";
import OrderFooter from "./order-footer";
import OrderDoneCard from "../order/order-done-card";

function OrderTable() {
  return (
    <>
      <div className="flex justify-items-start items-start sm:justify-start">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            <OrderDoneCard />
            <OrderDoneCard />
          </div>
        </div>
      </div>
      {/* <OrderHeader />
      <OrderData /> */}
      {/* <OrderFooter /> */}
    </>
  );
}

export default OrderTable;
