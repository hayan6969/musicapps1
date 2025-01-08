import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Badge,
} from "@material-tailwind/react";
import Link from "next/link";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { updateDrawer } from "@/redux/features/chat/chatSlice";

export default function JobApplications() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <List>
        <ListItem
          className="relative hover:bg-blue-gray-200/30 gap-3"
          onClick={() => dispatch(updateDrawer())}
        >
          <ListItemPrefix className="mr-0">
            <Badge
              placement="top-end"
              overlap="circular"
              color="blue"
              withBorder
            >
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="h6" color="blue">
              UI Designer
            </Typography>
            <Typography variant="small" color="blue" className="font-normal">
              Fulltime - 0 New Applications
            </Typography>
          </div>
          <div className="flex justify-end">
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-4 w-4`}
              color="blue"
            />
          </div>
        </ListItem>
      </List>
    </>
  );
}
