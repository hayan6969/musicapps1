"use client";
import React, { useEffect, useState } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import Comment from "./comment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CategoriesService } from "@/services/categories.service";
import { useRouter } from "next/navigation";

interface CommentType {
  _id: string;
  userId: string;
  comment: string;
  createdAt: string;
}

interface ContentRightSideV2Props {
  source?: "assets" | "home";
}

function ContentRightSideV2({ source = "home" }: ContentRightSideV2Props) {
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const [musicDetail, setMusicDetail] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    if (selectedId) {
      try {
        // Only fetch from music-asset endpoint if we're on the assets page
        const allData = await CategoriesService.getCategories();
        const detail = allData.find((item: any) => item.id === selectedId);
        setMusicDetail(detail);
      } catch (error) {
        console.error("Error fetching music detail:", error);
      }
    }
  };

  useEffect(() => {
    // Only fetch if we're on the assets page
    if (source === "assets") {
      fetchData();
      console.log("Fetching music-asset data in ContentRightSideV2");
    }
  }, [selectedId, source]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:3000/v1/music/comment/${selectedId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment: commentText,
          }),
        }
      );

      if (response.status === 201) {
        setCommentText("");
        await fetchData();
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetTouch = () => {
    alert("Get Touch button clicked");
    console.log("Get Touch clicked - attempting navigation");
    try {
      window.location.href = "http://localhost:3001/chat";
    } catch (error) {
      console.error("Navigation error:", error);
      alert("Navigation failed: " + error);
    }
  };

  return (
    <div className="flex flex-col py-4 px-6 gap-4 w-[38rem] overflow-y-auto border-2 border-black rounded-xl">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-notoSemibold">Describe</p>
        <p className="max-h-[12rem] text-xs text-justify tracking-wide">
          {musicDetail?.description}
        </p>
      </div>

      <button
        onClick={handleGetTouch}
        className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 self-end"
      >
        Get Touch
      </button>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-notoSemibold">Comment</p>
        <div className="flex flex-row gap-2 -mb-2">
          <ChartPieIcon color="blue" className="h-8 w-8" />
          <Textarea
            className="text-xs !h-[1rem] !text-black"
            label="what your though about this project?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <Button
            variant="outlined"
            size="sm"
            className="normal-case text-center text-white text-[0.6rem] bg-blue-800 py-1 px-10 w-[10rem]"
            onClick={handleCommentSubmit}
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Submitting..." : "Enter Comment"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 ml-10 overflow-y-auto">
        {Array.isArray(musicDetail?.comments) &&
          musicDetail.comments.map((comment: CommentType) => (
            <Comment
              key={comment._id}
              userId={comment.userId}
              userName="Unknown User"
              comment={comment.comment}
              createdAt={comment.createdAt}
              profilePicture={null}
            />
          ))}
      </div>
    </div>
  );
}

export default ContentRightSideV2;
