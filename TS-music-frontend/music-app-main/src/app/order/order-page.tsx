import InvoiceDialog from "@/components/invoice/invoice-dialog";
import React from "react";
import OriginalTabs from "@/components/tabs/originalTabs";
import OrderTable from "@/components/order-table/order-table";
import OrderCanceled from "@/components/order-table/order-canceled";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function OrderPage() {
  const isCustomer = useSelector((state: RootState) => state.offer.isCustomer);
  return (
    <>
      <InvoiceDialog />
      <section className="py-10 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="font-manrope font-extrabold text-3xl lead-10 text-black mb-9">
            {isCustomer ? "My Orders" : "My Work Orders"}
          </h2>
          <div className="flex sm:flex-col lg:flex-row sm:items-center justify-between">
            <OriginalTabs />
          </div>
          {/* <div className="mt-7 border border-gray-300">
            <OrderTable />
            <OrderCanceled />
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
          </div> */}
        </div>
      </section>
    </>
  );
}

export default OrderPage;
