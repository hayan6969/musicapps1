"use client";

import MemberManagementCard from "@/components/member-management/member-management-card";
import React from "react";

export function MemberManagementPage() {
  return (
    <div className="flex flex-col gap-6 min-h-screen items-center overflow-y-auto pt-8 bg-gray-100">
      <h1 className="font-bold text-2xl">Member Management</h1>
      <MemberManagementCard />
    </div>
  );
}

export default MemberManagementPage;
