"use client";

import SalesCard from "@/components/sales/sales-card";
import React from "react";

export function SalesPage() {
  return (
    <>
      <div className="flex flex-col gap-6 min-h-screen items-center overflow-y-auto pt-8 bg-gray-100">
        <h1 className="font-bold text-2xl">My Sales</h1>
        <SalesCard />
        <SalesCard />
        <SalesCard />
        <SalesCard />
      </div>
    </>
  );
}

export default SalesPage;
