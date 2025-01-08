import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateMenu } from "@/redux/features/menu/menuSlice";

interface NavItemProps {
  children: React.ReactNode;
  url: string;
  title?: string;
}

function NavItem({ children, url, title }: NavItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <li>
      <Link
        href={url}
        onClick={
          title
            ? () => {
                dispatch(updateMenu(title));
              }
            : () => {
                console.log("do nothing");
              }
        }
      >
        <Typography
          variant="paragraph"
          className="flex items-center gap-2 font-medium"
        >
          {children}
        </Typography>
      </Link>
    </li>
  );
}

export default NavItem;
