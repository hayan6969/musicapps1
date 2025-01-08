import { FREE_TEXT } from "@/default/services-text";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="#06D001"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function FreeCard() {
  return (
    <Card
      color="white"
      variant="gradient"
      className="w-full max-w-[25rem] h-fit p-8 hover:border-2 hover:border-blue-400 cursor-pointer focus:border-2 focus:border-blue-400"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8"
      >
        <span className=" text-black text-xl font-medium me-2 px-2.5 py-0.5 rounded-full">
          FREE
        </span>
        <Typography
          variant="h1"
          color="black"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-2xl">US$</span>0{" "}
          <span className="self-end text-2xl">/mo</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {FREE_TEXT.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal text-sm">{item}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
