import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { isCustomer } from "@/redux/features/offer/offerSlice";
import { Toast } from "primereact/toast";
import { logout } from "@/redux/features/auth/authSlice";
import { useLocalStorage } from "@/context/LocalStorageContext";

interface UserProps {
  user: any;
}

export default function DropdownProfile({ user }: UserProps) {
  const dispatch = useDispatch();
  const toast = useRef<Toast>(null);
  const { getItem, removeItem } = useLocalStorage();
  const [auth, setAuth] = useState<any>(getItem("auth", null)); // Load initial user from local storage

  const onLogout = async () => {
    try {
      const refreshToken = auth.tokens.refresh.token;
      console.log({ refreshToken });
      const response = await fetch("http://localhost:3000/v1/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken,
        }),
      });

      if (response.status == 204) {
        //   reset();
        // const result = await response.json();
        removeItem("auth");
        // dispatch(logout());
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Logout successful!",
          life: 3000,
        });
        window.location.href = "/";
      }
      //  else {
      //   const errorResult = await response.json();
      //   toast.current?.show({
      //     severity: `${errorResult.code == 422 ? "warn" : "error"}`,
      //     summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
      //     detail: `Error: ${errorResult.message || "Failed to logout"}`,
      //     life: 3000,
      //   });
      // }
    } catch (error) {
      console.error("Error during logout:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };
  return (
    <Menu>
      <Toast ref={toast} />
      <MenuHandler>
        <Avatar
          variant="circular"
          alt="profile picture"
          size="sm"
          className="cursor-pointer"
          src={
            user?.profilePicture
              ? `http://localhost:3000/uploads/${user.id}/profilePicture.png`
              : "/image/default-picture.png"
          }
        />
      </MenuHandler>
      <MenuList>
        <div className="flex flex-col justify-center items-center focus:outline-none">
          <div className="flex flex-col justify-center items-center mb-5">
            <p className="text-black font-semibold">{user.name}</p>
            <p className="text-black font-medium">{user.email}</p>
          </div>
          <Link href={"/member-management"}>
            <Button
              variant="filled"
              size="sm"
              color="blue"
              className="normal-case text-white w-full text-center cursor-pointer"
            >
              Upgrade to Pro
            </Button>
          </Link>
        </div>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2">
          <Link href={"/user-space"}>
            <Typography variant="small" className="font-medium">
              View Profile
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link href={"/edit-user-space"}>
            <Typography variant="small" className="font-medium">
              Edit Profile
            </Typography>
          </Link>
        </MenuItem>
        {/* <MenuItem className="flex items-center gap-2">
          <Typography variant="small" className="font-medium">
            Edit My Availability
          </Typography>
        </MenuItem> */}
        <MenuItem className="flex items-center gap-2">
          <Link href={"/order"} onClick={() => dispatch(isCustomer(false))}>
            <Typography variant="small" className="font-medium">
              My Work Orders
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link href={"/order"} onClick={() => dispatch(isCustomer(true))}>
            <Typography variant="small" className="font-medium">
              My Orders
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link href={"/sales"}>
            <Typography variant="small" className="font-medium">
              My Sales
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link href={"/purchase"}>
            <Typography variant="small" className="font-medium">
              My Purchase
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-collection" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Collections
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-liked" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Liked
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2">
          <Link
            href={{
              pathname: "/user-space",
              query: { section: "my-following" },
            }}
          >
            <Typography variant="small" className="font-medium">
              My Following
            </Typography>
          </Link>
        </MenuItem>
        <hr className="my-2 border-blue-gray-50" />
        <MenuItem className="flex items-center gap-2 ">
          <Link href={"/settings"}>
            <Typography variant="small" className="font-medium">
              Setting
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2 ">
          <Link href={"/contact-us"}>
            <Typography variant="small" className="font-medium">
              Contact Us
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem className="flex items-center gap-2 ">
          <Typography
            onClick={onLogout}
            variant="small"
            className="font-medium"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
