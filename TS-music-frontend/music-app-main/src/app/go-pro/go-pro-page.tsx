"use client";

import { FreeCard } from "@/components/go-pro/free-card";
import { GoProCard } from "@/components/go-pro/go-pro-card";
import React from "react";

export function GoProPage() {
  return (
    <>
      <section className="flex min-h-screen justify-center px-4 py-2 gap-10">
        <FreeCard />
        <GoProCard />
      </section>
    </>
  );
}

export default GoProPage;
