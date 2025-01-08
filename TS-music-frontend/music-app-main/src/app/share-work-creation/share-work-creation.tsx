"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import LeftSideFirst from "../../components/share-work-creation/left-side-first";
import RightSideFirst from "../../components/share-work-creation/right-side-first";
import LeftSideSecond from "../../components/share-work-creation/left-side-second";
import RightSideSecond from "../../components/share-work-creation/right-side-second";
import BottomPart from "../../components/share-work-creation/bottom-part";
import MusicBackgroundDialog from "../../components/share-work-creation/music-background-dialog";
import { MusicallService } from "@/services/musicall.service";
import MusicCreationService from "@/services/music-creation.service";

interface FormData {
  musicName: string;
  myRole: string[];
  description: string;
  musicImage: FileList;
  music: FileList;
  musicLyric?: FileList;
  musicBackground?: FileList;
  musicUse: string[];
  musicStyle: string;
  musicMood?: string;
  musicInstrument?: string;
  tags: string;
  softwareTool?: string;
  singerName?: string;
  publisher?: string;
  songLanguage?: string;
}

export function ShareWorkCreationPage() {
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      musicName: "",
      myRole: [],
      description: "",
    },
  });

  useEffect(() => {
    // Check for authentication token when component mounts
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No authentication token found. Please log in.",
        life: 3000,
      });
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log("Form value changed:", name, value)
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitting data:", data);

      const formattedData = {
        musicName: data.musicName,
        myRole: data.myRole,
        singerName: data.singerName || "",
        publisher: data.publisher || "",
        songLanguage: data.songLanguage || "",
        musicUsage: data.musicUse,
        musicStyle: data.musicStyle,
        musicMood: data.musicMood || "",
        musicImage: "path/to/image.jpg",
        music: "path/to/music.mp3",
        musicLyric: data.musicLyric ? "Example lyrics..." : "",
        musicPlaybackBackground: "path/to/background.jpg",
        musicInstrument: data.musicInstrument || "",
        tags: data.tags,
        description: data.description,
        softwareTool: data.softwareTool || "",
      };

      await MusicCreationService.createMusic(formattedData);

      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Work shared successfully!",
        life: 3000,
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          error instanceof Error ? error.message : "Failed to submit form",
        life: 3000,
      });
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="flex flex-row justify-center items-center my-8">
      <Toast ref={toast} />
      <MusicBackgroundDialog setValue={setValue} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-8">
            <LeftSideFirst register={register} errors={errors} />
            <LeftSideSecond register={register} errors={errors} />
          </div>

          <div className="flex flex-col gap-8">
            <RightSideFirst register={register} errors={errors} />
            <RightSideSecond register={register} errors={errors} />
          </div>
        </div>

        <BottomPart register={register} errors={errors} />

        <div className="flex flex-row justify-between gap-4 mb-10 mt-2">
          <Button
            type="button"
            onClick={() => router.back()}
            className="bg-blue-gray-100 text-black w-32"
            color="blue-gray"
            variant="outlined"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <div className="flex flex-row gap-6">
            <Button
              type="button"
              className="bg-blue-gray-100 text-black w-56"
              color="blue-gray"
              variant="outlined"
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="w-56"
              color="blue"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">
              Please fix the following errors:
            </strong>
            <ul className="list-disc list-inside mt-2">
              {errors.musicName && (
                <li>{errors.musicName.message as string}</li>
              )}
              {errors.myRole && <li>{errors.myRole.message as string}</li>}
              {errors.description && (
                <li>{errors.description.message as string}</li>
              )}
            </ul>
          </div>
        )}
      </form>
    </section>
  );
}

export default ShareWorkCreationPage;
