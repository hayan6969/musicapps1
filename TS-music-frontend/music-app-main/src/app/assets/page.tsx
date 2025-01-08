// components
import { NavbarSecond, Footer } from "@/components";

// sections
import AssetsPage from "@/app/assets/assets-page";
import HeroAssets from "../hero-assets";

export default function Portfolio() {
  return (
    <>
      <NavbarSecond />
      <HeroAssets />
      <AssetsPage />
    </>
  );
}
