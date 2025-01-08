import ProfileBox from "@/components/profile/profile-box";
import { CATEGORIES } from "@/dummy/example";
import React from "react";

function MyFollowing() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {CATEGORIES.map((props, key) => (
        <ProfileBox key={key} {...props} />
      ))}
    </div>
  );
}

export default MyFollowing;
