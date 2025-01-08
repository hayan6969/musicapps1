"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function SummarySection() {
  return (
    <Card className="mt-6 w-[30rem] h-fit">
      <CardBody>
        <div className="flex flex-col gap-2">
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Order Summary
          </Typography>
          <hr className="my-2 border-blue-gray-50" />
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Subtotal:</p>
            <p className="text-black font-bold text-sm">$47.00</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Value added tax:</p>
            <p className="text-black font-bold text-sm">+ $2.35</p>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <div className="flex flex-row justify-between w-full">
            <p className="text-black font-bold text-sm">Final Price:</p>
            <p className="text-black font-bold text-sm">$49.35</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
