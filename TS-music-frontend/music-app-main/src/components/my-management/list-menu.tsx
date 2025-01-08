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
import { updateDrawer as updateDetailSection } from "@/redux/features/management/managementSlice";

export default function ListMenu() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <List className="gap-2">
        <ListItem
          className="relative hover:bg-blue-gray-200/30 gap-3 border-2 border-black/10"
          onClick={() => {
            dispatch(updateDrawer());
            dispatch(
              updateDetailSection({
                detailTitle: "Contact Us",
                icon: "contact-us",
              })
            );
          }}
        >
          <ListItemPrefix className="mr-0">
            <Badge
              placement="top-end"
              overlap="circular"
              color="red"
              withBorder
            >
              <img
                src={"/icons/contact-us.png"}
                style={{ height: 52, width: 52 }}
                className="hover:scale-125 cursor-pointer"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="h6" color="black">
              Contact Us
            </Typography>
            <Typography variant="small" color="red" className="font-bold">
              2 News
            </Typography>
          </div>
          <div className="flex justify-end">
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-4 w-4`}
              color="black"
            />
          </div>
        </ListItem>
        <ListItem
          className="relative hover:bg-blue-gray-200/30 gap-3 border-2 border-black/10"
          onClick={() => {
            dispatch(updateDrawer());
            dispatch(
              updateDetailSection({
                detailTitle: "Report",
                icon: "report",
              })
            );
          }}
        >
          <ListItemPrefix className="mr-0">
            <Badge
              placement="top-end"
              overlap="circular"
              color="red"
              withBorder
            >
              <img
                src={"/icons/report.png"}
                style={{ height: 52, width: 52 }}
                className="hover:scale-125 cursor-pointer"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="h6" color="black">
              Report
            </Typography>
            <Typography variant="small" color="red" className="font-bold">
              2 News
            </Typography>
          </div>
          <div className="flex justify-end">
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-4 w-4`}
              color="black"
            />
          </div>
        </ListItem>
        <ListItem
          className="relative hover:bg-blue-gray-200/30 gap-3 border-2 border-black/10"
          onClick={() => {
            dispatch(updateDrawer());
            dispatch(
              updateDetailSection({
                detailTitle: "Order Orbitation",
                icon: "contact-us",
              })
            );
          }}
        >
          <ListItemPrefix className="mr-0">
            <Badge
              placement="top-end"
              overlap="circular"
              color="red"
              withBorder
            >
              <img
                src={"/icons/contact-us.png"}
                style={{ height: 52, width: 52 }}
                className="hover:scale-125 cursor-pointer"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="h6" color="black">
              Order Orbitation
            </Typography>
            <Typography variant="small" color="red" className="font-bold">
              2 News
            </Typography>
          </div>
          <div className="flex justify-end">
            <ChevronRightIcon
              strokeWidth={2.5}
              className={`h-4 w-4`}
              color="black"
            />
          </div>
        </ListItem>
      </List>
    </>
  );
}
