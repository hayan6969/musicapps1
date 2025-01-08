import {
  CalendarIcon,
  ChevronRightIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Badge,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";

export default function DetailApplication() {
  return (
    <>
      <List>
        <ListItem className="hover:bg-blue-gray-200/30 p-2 mt-0">
          <ListItemPrefix className="mr-2">
            <Badge
              placement="top-end"
              overlap="circular"
              color="blue"
              withBorder
            >
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="sm"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="small" color="gray" className="font-semibold">
              UI Designer
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal text-xs"
            >
              Fulltime
            </Typography>
          </div>
        </ListItem>
        <div className="flex flex-col gap-2 px-4">
          <p className="text-xs rounded-full bg-orange-100 w-fit font-semibold text-orange-600 px-2 py-1">
            Inactive - Expired on Aug 1 , 2024
          </p>
          <div className="flex flex-row items-center gap-2">
            <CalendarIcon className="h-6 w-6 cursor-pointer" color="black" />
            <p className="text-xs w-fit font-semibold">Posted Jul 2, 2024</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <ListBulletIcon className="h-6 w-6 cursor-pointer" color="black" />
            <p className="text-xs w-fit font-semibold">29 Applicantions</p>
            <p className="text-[0.5rem] w-fit rounded-md font-semibold bg-blue-100 text-blue-800 px-1">
              18 NEW
            </p>
          </div>
          <div className="">
            <Button
              variant="text"
              size="sm"
              className="normal-case text-center items-center flex flex-row gap-1 text-[0.8rem] px-5 py-1 border rounded-full border-black/50"
            >
              Edit
            </Button>
          </div>
        </div>
      </List>
    </>
  );
}
