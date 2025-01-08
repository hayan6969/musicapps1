// components
import { NavbarSecond, Footer } from "@/components";

// sections
import HeroJobs from "@/app/jobs-detail/hero-jobs";

import AboutEvent from "@/app/about-event";
import MyProjects from "@/app/my-projects/my-projects";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      <NavbarSecond />
      {/* <HeroJobs /> */}
      {/* <SponsoredBy /> */}
      <MyProjects />
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
