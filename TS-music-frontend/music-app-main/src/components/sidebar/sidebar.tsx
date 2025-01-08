import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { filterContent } from "@/default/filter";
import {
  instruments,
  moods,
  musicGenres,
  musicStyles,
} from "@/default/sidebar-filter";
import FilterContent from "../assets/filter-content";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="min-h-screen w-full max-w-[15rem] border-r-2 border-black/10 rounded-none shadow-none">
      <div className="flex my-4 p-4">
        <div className="flex flex-row gap-1 w-full">
          <Input crossOrigin={""} label="Search" size="md" />
        </div>
      </div>
      <div className="p-4">
        <FilterContent data={filterContent} />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              {/* <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix> */}
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-sm"
              >
                Instruments
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-2">
              {instruments.map((item, index) => (
                <label
                  key={`instrument-${index}`}
                  htmlFor={`instrument-${index}`}
                  className="flex cursor-pointer items-center gap-2 p-2 text-sm"
                >
                  <Checkbox
                    ripple={false}
                    crossOrigin={""}
                    id={`instrument-${index}`}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  {item}
                </label>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-sm"
              >
                Music Usage
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-2">
              {musicGenres.map((item, index) => (
                <label
                  key={`musicGenres-${index}`}
                  htmlFor={`musicGenres-${index}`}
                  className="flex cursor-pointer items-center gap-2 p-2 text-sm"
                >
                  <Checkbox
                    ripple={false}
                    crossOrigin={""}
                    id={`musicGenres-${index}`}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  {item}
                </label>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 3 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 3}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className="border-b-0 p-3"
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-sm"
              >
                Music Style
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-2">
              {musicStyles.map((item, index) => (
                <label
                  key={`musicStyles-${index}`}
                  htmlFor={`musicStyles-${index}`}
                  className="flex cursor-pointer items-center gap-2 p-2 text-sm"
                >
                  <Checkbox
                    ripple={false}
                    crossOrigin={""}
                    id={`musicStyles-${index}`}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  {item}
                </label>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 4}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 4 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 4}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className="border-b-0 p-3"
            >
              <Typography
                color="blue-gray"
                className="mr-auto font-normal text-sm"
              >
                Moods
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-2">
              {moods.map((item, index) => (
                <label
                  key={`moods-${index}`}
                  htmlFor={`moods-${index}`}
                  className="flex cursor-pointer items-center gap-2 p-2 text-sm"
                >
                  <Checkbox
                    ripple={false}
                    crossOrigin={""}
                    id={`moods-${index}`}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                  />
                  {item}
                </label>
              ))}
            </List>
          </AccordionBody>
        </Accordion>
      </List>
    </Card>
  );
}
