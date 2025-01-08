// components
import { NavbarSecond, Footer } from "@/components";

// sections
import Hero from "@/app/hero";
import AboutEvent from "@/app/about-event";
import JobsPage from "@/app/jobs/jobs-page";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      <NavbarSecond />
      {/* <Hero /> */}
      {/* <SponsoredBy /> */}
      <JobsPage />
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
