// import { CATEGORIES } from "@/dummy/example";
import { MusicallService } from "@/services/musicall.service";
import React, { useState, useEffect } from "react";
import BoxWithInfo from "../../components/music-box/box-with-info";

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
}

export default function Collections() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await MusicallService.fetchMusicAssets();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {categories.map((props, key) => (
          <BoxWithInfo key={key} {...props} withSale={false} />
        ))}
      </div>
    </>
  );
}
