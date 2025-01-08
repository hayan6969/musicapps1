import { Button } from "@material-tailwind/react";
import React from "react";

function PurchaseDetailItem() {
  return (
    <>
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <h5 className="text-xl font-medium leading-tight ">Everytime</h5>
            <p className="text-base">By Yang Ting</p>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            <Button
              variant="filled"
              size="sm"
              color="blue"
              className="normal-case text-white text-center cursor-pointer"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PurchaseDetailItem;
