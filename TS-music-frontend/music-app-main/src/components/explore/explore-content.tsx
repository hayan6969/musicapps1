"use client";
import BoxWithInfo from "@/components/music-box/box-with-info";
import { MusicallService } from "@/services/musicall.service";
import { CategoriesService } from "@/services/categories.service";
import { useState, useEffect } from "react";

interface CategoryProps {
  id: string;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName: string;
  musicStyle: string;
  tags: string[] | string;
  createdBy: string;
  myRole: string[];
  // Optional fields
  title?: string;
  descriptionjob?: string;
  workcontent?: string;
  musicculture?: string;
}

function ExploreContent() {
  const [jobs, setJobs] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await CategoriesService.getCategories();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {jobs.map((props: CategoryProps, key) => (
            <BoxWithInfo
              key={key}
              {...props}
              withFindSimilar={true}
              withSale={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExploreContent;
