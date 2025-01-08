"use client";

import PurchaseCard from "@/components/purchase/purchase-card";
import React from "react";

export function PurchasePage() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center overflow-y-auto pt-8 bg-gray-100">
      <h1 className="font-bold text-2xl">My Purchase</h1>
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
      <PurchaseCard />
    </div>
  );
}

export default PurchasePage;
