import { Avatar } from "@material-tailwind/react";
import React from "react";

interface CommentProps {
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
  profilePicture: string | null;
}

function Comment({
  userId,
  userName,
  comment,
  createdAt,
  profilePicture,
}: CommentProps) {
  console.log("Comment props:", {
    userId,
    userName,
    comment,
    createdAt,
    profilePicture,
  }); // Debug log

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    return `${diffInHours} Hours Ago`;
  };

  return (
    <div className="flex flex-row gap-2">
      <Avatar
        src={
          profilePicture || "https://docs.material-tailwind.com/img/face-2.jpg" // Removed trailing slash
        }
        alt="avatar"
        size="sm"
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row gap-1">
          <p className="text-xs font-bold">{userName}</p>
          <p className="text-xs text-gray-500">{formatTimeAgo(createdAt)}</p>
          <p className="text-xs text-gray-500 hover:underline cursor-pointer">
            Reply
          </p>
        </div>
        <div className="flex flex-row gap-1">
          <p className="text-[0.7rem] font-semibold">{comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
