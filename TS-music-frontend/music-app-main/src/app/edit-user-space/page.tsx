// components
import { NavbarSecond, Footer } from "@/components";

// sections
import HeroUSer from "@/app/user-space/hero-user";

import AboutEvent from "@/app/about-event";
import EditUserSpace from "@/app/edit-user-space/edit-user-space";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      <NavbarSecond />
      <EditUserSpace />
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
