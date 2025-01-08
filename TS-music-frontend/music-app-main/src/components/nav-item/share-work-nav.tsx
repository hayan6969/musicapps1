import React from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  ArrowRightIcon,
  CursorArrowRaysIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Typography } from "@material-tailwind/react";

// Dynamically import Material Tailwind components
const Menu = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.Menu),
  { ssr: false }
);

const MenuHandler = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuHandler),
  { ssr: false }
);

const MenuList = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuList),
  { ssr: false }
);

const MenuItem = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.MenuItem),
  { ssr: false }
);

const Button = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.Button),
  { ssr: false }
);

const menuItems = [
  {
    url: "share-work-creation",
    description: "Upload Music Creation",
    size: "0.8",
    iconName: "share-work-creation",
  },
  {
    url: "share-work-sales-market",
    description: "Upload Music Assets to the sales market",
    size: "0.6",
    iconName: "share-work-market",
  },
  {
    url: "share-lyrics",
    description: "Share Your Lyrics (without music)",
    size: "0.6",
    iconName: "share-lyric",
  },
];

interface NavProps {
  isScrolling: boolean;
  lightOnly?: boolean;
}

export default function ShareWorkNav({
  isScrolling,
  lightOnly = false,
}: NavProps) {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <div className="relative">
      <Menu open={openMenu} handler={setOpenMenu}>
        <MenuHandler>
          {lightOnly ? (
            <Button
              color={"gray"}
              variant="outlined"
              size="sm"
              className={`rounded-full text-xs font-notoCondensed border-gray-300 normal-case transition-colors ${"text-black hover:bg-gray-300"}`}
            >
              Share Your Work
            </Button>
          ) : (
            <Button
              color={"gray"}
              variant="outlined"
              size="sm"
              className={`rounded-full text-xs font-sans border-gray-300 normal-case transition-colors ${
                isScrolling
                  ? "text-black hover:bg-gray-300"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              Share Your Work
            </Button>
          )}
        </MenuHandler>
        <MenuList className="hidden w-[18rem] p-1 gap-3 overflow-visible lg:grid hover:outline-none focus:outline-none">
          <ul className="flex w-full flex-col gap-1">
            {menuItems.map(({ url, description, size, iconName }) => (
              <Link
                href={"/" + url}
                key={url}
                className="hover:outline-none focus:outline-none active:outline-none"
              >
                <MenuItem className="flex flex-row justify-between items-center gap-4">
                  <img
                    src={`/icons/${iconName}.png`}
                    style={{ height: 37, width: 37 }}
                    className="cursor-pointer"
                    alt={description}
                  />
                  <Typography
                    variant="h6"
                    color="black"
                    className={`font-semibold text-center text-[${size}rem]`}
                  >
                    {description}
                  </Typography>
                  <ArrowRightIcon className="h-6 w-6 text-black font-bold" />
                </MenuItem>
              </Link>
            ))}
          </ul>
        </MenuList>
      </Menu>
    </div>
  );
}
