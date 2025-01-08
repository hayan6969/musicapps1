import React, { useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
  CloudIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleBottomCenterTextIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { NAV_MENU } from "@/default/nav-menu";
import NavItem from "./nav-item/nav-item";
import Cart from "./cart/cart";
import DropdownProfile from "./profile/dropdown-profile";
import ShareWorkNav from "./nav-item/share-work-nav";
import { dataChat } from "@/dummy/listchat-example";
import { useLocalStorage } from "@/context/LocalStorageContext";

export function NavbarSecond() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const { getItem, setItem } = useLocalStorage();
  const [auth, setAuth] = useState<any>(getItem("auth", null)); // Load initial user from local storage

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <MTNavbar
        shadow={true}
        fullWidth
        blurred={false}
        // color={isScrolling ? "white" : "transparent"}
        color={"white"}
        className={`fixed py-2 top-0 z-50 border-0 ${
          "bg-white"
          //   isScrolling ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="mx-10 flex items-center justify-between">
          <div className="flex flex-row">
            <Link href={"/"}>
              <Typography
                // color={isScrolling ? "blue-gray" : "white"}
                color={"black"}
                className="text-lg font-bold font-notoCondensed"
              >
                Music App
              </Typography>
            </Link>
            <ul
              className={`ml-10 hidden items-center gap-6 lg:flex ${
                "text-gray-900"
                // isScrolling ? "text-gray-900" : "text-white"
              }`}
            >
              {NAV_MENU.map(({ name, url, title }) => (
                <NavItem key={name} url={url} title={title}>
                  <span className="font-semibold font-notoCondensed hover:text-blue-500 transition-colors">
                    {name}
                  </span>
                </NavItem>
              ))}
            </ul>
          </div>
          <div>
            <div className="hidden items-center gap-4 lg:flex">
              {/* <Button color={isScrolling ? "gray" : "white"} variant="text"> */}
              <div className="w-72">
                <form>
                  <label
                    // for="search"
                    className="mb-2 text-sm font-medium text-gray-900 font-notoCondensed sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      className={`block w-full p-4 ps-10 h-3 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 ${
                        "bg-gray-50"
                        // isScrolling ? "bg-gray-50" : "bg-transparent"
                      }`}
                      autoComplete="off"
                      placeholder="Search"
                      // required
                    />
                    {/* <button
                      type="submit"
                      className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Search
                    </button> */}
                  </div>
                </form>
              </div>
              {/* <Link href={"/share-work"}>
                <Button
                  color={"gray"}
                  variant="outlined"
                  size="sm"
                  className={`rounded-full text-xs font-sans border-gray-300 normal-case transition-colors ${
                    "text-black hover:bg-gray-300"
                    // isScrolling
                    //   ? "text-black hover:bg-gray-300"
                    //   : "text-white hover:bg-gray-800"
                  }`}
                >
                  Share Your Work
                </Button>
              </Link> */}
              {auth?.user ? (
                <>
                  <ShareWorkNav isScrolling={isScrolling} lightOnly={true} />
                  <Link href={"/my-management"}>
                    <img
                      src={"/icons/my-management-black.png"}
                      style={{ height: 33, width: 38 }}
                      className="cursor-pointer"
                    />
                  </Link>
                  <Link href={"/chat"} className="mt-1">
                    <Badge
                      content={dataChat.length}
                      color="red"
                      withBorder
                      className="p-1"
                    >
                      <img
                        src={"/icons/message-black.png"}
                        style={{ height: 22, width: 24 }}
                        className="cursor-pointer"
                      />
                    </Badge>
                  </Link>
                  <Cart />
                  <DropdownProfile user={auth.user} />
                </>
              ) : (
                <Link href={"/auth"}>
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
                    Sign In
                  </Button>
                </Link>
              )}
              {/* <Link href={"/user-space"}>
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg/"
                  alt="avatar"
                  size="sm"
                />
              </Link> */}
              {/* <Button color={"gray"} variant="text">
                Log in
              </Button> */}
              {/* <Button color={isScrolling ? "gray" : "white"}>REGISTER</Button> */}
              {/* <Button color={"gray"}>REGISTER</Button> */}
            </div>
            <IconButton
              variant="text"
              // color={isScrolling ? "gray" : "white"}
              color={"gray"}
              onClick={handleOpen}
              className="ml-auto inline-block lg:hidden"
            >
              {open ? (
                <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={open}>
          <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
            <ul className="flex flex-col gap-4 text-gray-900">
              {NAV_MENU.map(({ name, url, title }) => (
                <NavItem key={name} url={url} title={title}>
                  {name}
                </NavItem>
              ))}
            </ul>
            <div className="mt-6 flex items-center gap-4">
              <Button variant="text">Log in</Button>
              <Button color="gray">REGISTER</Button>
            </div>
          </div>
        </Collapse>
      </MTNavbar>
      <div className="pt-[3.5rem]"></div>
    </>
  );
}

export default NavbarSecond;
