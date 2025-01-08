"use client";
import React, { useState, useEffect } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import Comment from "./comment";
import { getAuthToken } from "@/utils/auth";
import { MusicAssetService } from "@/services/music-asset.service";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import {
  updateMusicAsset,
  setMusicDetail,
} from "@/redux/features/offer/offerSlice";
import { useRouter } from "next/navigation";

interface ContentRightSideAssetsProps {
  musicData: any;
}

function ContentRightSideAssets({ musicData }: ContentRightSideAssetsProps) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<any[]>([]);
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const dispatch = useDispatch();
  const router = useRouter();

  // Initialize local comments when musicData changes
  useEffect(() => {
    if (musicData?.comments) {
      setLocalComments(musicData.comments);
    }
  }, [musicData]);

  // Fetch updated music asset data
  const fetchUpdatedMusicAsset = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/v1/music-asset/${selectedId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      if (response.ok) {
        const updatedData = await response.json();
        dispatch(updateMusicAsset(updatedData));
        setLocalComments(updatedData.comments || []);
      }
    } catch (error) {
      console.error("Error fetching updated music asset:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:3000/v1/music-asset/comment/${selectedId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAuthToken()}`,
          },
          body: JSON.stringify({ comment: commentText }),
        }
      );

      if (response.status === 201) {
        const newComment = await response.json();

        // Add new comment to local state immediately for instant feedback
        const newCommentObj = {
          _id: newComment._id || Date.now().toString(),
          userId: newComment.userId,
          comment: commentText,
          createdAt: new Date().toISOString(),
        };
        setLocalComments((prevComments) => [newCommentObj, ...prevComments]);

        // Fetch updated data from server
        await fetchUpdatedMusicAsset();

        setCommentText("");
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
          {musicData?.description}
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
        {Array.isArray(localComments) &&
          localComments.map((comment: any) => (
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

export default ContentRightSideAssets;
