"use client";
import MusicPlayerDialog from "@/components/music-player/music-player-dialog";
import FilterExploreComponent from "@/components/filters/filter-explore";

export function ExplorePage() {
  return (
    <>
      <FilterExploreComponent />
      <section className="py-8 flex justify-center sm:justify-center md:px-4 lg:py-4">
        <MusicPlayerDialog source="home" />
      </section>
    </>
  );
}

export default ExplorePage;
