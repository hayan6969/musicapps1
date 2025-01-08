// components
import { NavbarSecond, Footer } from "@/components";

// sections
import HeroJobs from "@/app/jobs-detail/hero-jobs";
import MusicPlayer from "@/app/music-player/music-player";
import MusicPlayerV2 from "@/app/music-player/music-player-v2";
import AboutEvent from "@/app/about-event";
import ShareWork from "@/app/share-work-sales-market/share-work-sales-market";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      {/* <NavbarSecond /> */}
      {/* <HeroJobs /> */}
      {/* <MusicPlayer /> */}
      <MusicPlayerV2 />
      {/* <ShareWork /> */}
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
