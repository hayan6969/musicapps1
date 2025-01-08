// components
import { Navbar, Footer } from "@/components";

// sections
import HeroJobs from "@/app/jobs-detail/hero-jobs";

import AboutEvent from "@/app/about-event";
import DetailPage from "@/app/jobs-detail/detail-page";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <HeroJobs />
      {/* <SponsoredBy /> */}
      <DetailPage />
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
