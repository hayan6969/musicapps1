"use client";

import React from "react";
import CartItem from "./cart-item";
import SummarySection from "./summary-section";
import { Button } from "@material-tailwind/react";

function CartSection() {
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <CartItem />
          <CartItem />
        </div>
        <div className="flex flex-col">
          <SummarySection />
          <Button
            variant="filled"
            size="lg"
            color="teal"
            className="normal-case text-white text-center cursor-pointer mt-4"
          >
            Continue to checkout
          </Button>
        </div>
      </div>
    </>
  );
}

export default CartSection;
