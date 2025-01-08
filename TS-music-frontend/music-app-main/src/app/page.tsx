"use client";

// components
import { Navbar, Footer } from "@/components";
import Hero from "./hero";
import ExplorePage from "./explore-page";
import HomeMusicianBox from "@/components/music-box/home-musician-box";
import { CATEGORIES } from "@/conf/music";

export default function Portfolio() {
  // Only show a few items on the home page
  const featuredMusic = CATEGORIES.slice(0, 5); // Show only first 5 items

  return (
    <>
      <Navbar />
      <Hero />
      <ExplorePage />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
        {featuredMusic.map((props, key) => (
          <HomeMusicianBox
            key={key}
            {...props}
            source="home"
            isMusicAsset={false} // Explicitly set to false for home page
          />
        ))}
      </div>
    </>
  );
}
