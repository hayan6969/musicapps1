// components/share-work-creation/bottom-part.tsx
"use client";

import { Typography, Input, Textarea } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useState, useEffect } from "react";

interface BottomPartProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

function BottomPart({ register, errors }: BottomPartProps) {
  const [tagCount, setTagCount] = useState<number>(0);
  const [tagError, setTagError] = useState<string>("");

  const validateTags = (value: string) => {
    if (!value) return;

    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setTagCount(tags.length);

    if (tags.length < 3) {
      setTagError("Please enter at least 3 tags");
      return false;
    }

    if (tags.some((tag) => tag.length > 20)) {
      setTagError("Each tag must be less than 20 characters");
      return false;
    }

    setTagError("");
    return true;
  };

  return (
    <div className="mb-1 flex flex-col gap-6">
      {/* Musical Instrument Section */}
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-semibold"
        >
          Musical Instrument (Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          {...register("musicInstrument")}
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          placeholder="e.g., Piano, Guitar, Violin"
        />
      </div>

      {/* Tags Section */}
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-semibold"
        >
          Tags (Fill in at least 3 key attribute words, separated by commas)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          placeholder="e.g., Jazz, Acoustic, Instrumental"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          {...register("tags", {
            required: "Tags are required",
            validate: validateTags,
          })}
        />
        {errors.tags && (
          <span className="text-red-500 text-xs">
            {errors.tags.message as string}
          </span>
        )}
        {tagError && !errors.tags && (
          <span className="text-red-500 text-xs">{tagError}</span>
        )}
        <span className="text-gray-500 text-xs">{tagCount} tags added</span>
      </div>

      {/* Description Section */}
      <div>
        <Typography variant="small" color="blue-gray" className="font-semibold">
          Description *
        </Typography>
        <Textarea
          className="w-full min-h-[200px] p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="Describe your music piece..."
          {...register("description", {
            required: "Description is required",
            minLength: { value: 1, message: "Description is required" },
          })}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message as string}
          </span>
        )}
      </div>

      {/* Software Tool Section */}
      <div>
        <Typography
          variant="small"
          color="blue-gray"
          className="-mb-3 font-semibold"
        >
          Software Tool (Optional)
        </Typography>
        <Input
          crossOrigin={""}
          size="lg"
          placeholder="e.g., FL Studio, Ableton Live, Pro Tools"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900"
          {...register("softwareTool")}
        />
      </div>
    </div>
  );
}

export default BottomPart;
