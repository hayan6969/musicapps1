"use client";
import React, { useEffect, useState } from "react";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { Button, Textarea } from "@material-tailwind/react";
import Comment from "./comment";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { MusicCreationService } from "@/services/music-creation.service";
import { getAuthToken } from "@/utils/auth";

interface CommentType {
  _id: string;
  userId: string;
  comment: string;
  createdAt: string;
}

function ContentRightSideHome() {
  const selectedId = useSelector((state: RootState) => state.offer.selectedId);
  const isMusicPlayerDialog = useSelector(
    (state: RootState) => state.offer.musicPlayerDialog
  );
  const [musicDetail, setMusicDetail] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedId && isMusicPlayerDialog) {
        try {
          console.log("Fetching music creation data for ID:", selectedId);
          const detail = await MusicCreationService.getMusicCreationById(
            selectedId
          );
          setMusicDetail(detail);
        } catch (error) {
          console.error("Error fetching music creation detail:", error);
        }
      }
    };

    fetchData();
  }, [selectedId, isMusicPlayerDialog]);

  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      setMusicDetail(null);
    };
  }, []);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !selectedId || isSubmitting) return;

    const token = getAuthToken();
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
        // Refresh data after comment
        const detail = await MusicCreationService.getMusicCreationById(
          selectedId
        );
        setMusicDetail(detail);
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
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

export default ContentRightSideHome;
