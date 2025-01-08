// components
import { Navbar, Footer } from "@/components";

// sections
import HeroUSer from "@/app/user-space/hero-user";

import AboutEvent from "@/app/about-event";
import UserSpace from "@/app/user-space/user-space";
import OurStats from "@/app/our-stats";
import EventContent from "@/app/event-content";
import Faq from "@/app/faq";

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <HeroUSer />
      <UserSpace />
      {/* <AboutEvent />
      <OurStats />
      <EventContent />
      <Faq />
      <Footer /> */}
    </>
  );
}
