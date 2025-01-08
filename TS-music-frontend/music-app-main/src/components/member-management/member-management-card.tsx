import React from "react";
import MembershipDetails from "./membership-details";

function MemberManagementCard() {
  return (
    <>
      <div className="block bg-white border-2 border-black/10 text-surface shadow-secondary-1 w-[43.75rem]">
        <div className="border-b-2 bg-gray-800 border-neutral-100 px-6 py-3">
          <div className="flex justify-center items-center">
            <p className="text-white font-bold text-sm">Membership Details</p>
          </div>
        </div>
        <MembershipDetails />
      </div>
    </>
  );
}

export default MemberManagementCard;
