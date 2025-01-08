"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function CartItem() {
  return (
    <Card className="mt-6 w-[60rem]">
      <CardBody>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Every Time
            </Typography>
            <div className="flex flex-row gap-4 items-center">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                By Ying Tang
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Format: Mp3
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Music ID: DRX6783286
              </Typography>
            </div>
          </div>
          <div className="flex flex-row gap-4 absoulte top-0">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-blue-200"
            >
              $20.00
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-bold text-gray-400"
            >
              X
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
