import React from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import {
  ClockIcon,
  ArrowPathIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { cancelDialog } from "@/redux/features/offer/offerSlice";
import Link from "next/link";

function OrderOngoingCard() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <Card
        className={`relative grid min-h-[5rem] w-[23rem] overflow-hidden shadow-sm rounded-md border-black border-2`}
      >
        <CardBody className={`relative flex flex-col px-0 py-0`}>
          <div className="border-b-2 border-black/20 py-2 px-6 flex flex-row justify-between items-center">
            <div className="flex flex-col gap-0">
              <p className="text-[0.7rem] font-bold text-black">
                I Will compose a pop up music
              </p>
              <p className="text-[0.5rem] font-bold text-black">
                Orderer: Tom Blake
              </p>
            </div>
            <p className="text-[0.9rem] font-bold text-green-400">
              In Progress
            </p>
          </div>
          <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
            <div className="flex flex-row justify-between">
              <p className="text-[0.9rem] font-bold text-black">US$2000</p>
              <p className="text-[0.8rem] font-bold text-black">
                Start Time
                <span className="text-[0.7rem] ml-3">07/08/2024</span>
              </p>
            </div>
          </div>
          <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
            <div className="flex flex-row justify-between">
              <p className="text-[0.6rem] font-bold text-black text-justify">{`Lorem Ipsum has been the industry's standard dummy text ever since the 1500s`}</p>
            </div>
          </div>
          <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
            <div className="flex flex-col">
              <p className="text-[0.6rem] font-bold text-black">
                Your offer includes
              </p>
              <div className="flex flex-row justify-start gap-4">
                <div className="flex flex-row justify-center gap-1">
                  <ArrowPathIcon color="black" className="h-4 w-4" />
                  <p className="text-[0.6rem] font-bold text-black">
                    unlimited revisions
                  </p>
                </div>
                <div className="flex flex-row justify-center gap-1">
                  <ClockIcon color="black" className="h-4 w-4" />
                  <p className="text-[0.6rem] font-bold text-black">
                    20 days delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end mx-6 items-center gap-1 py-4">
            <div className="flex flex-row gap-2">
              <Button
                variant="filled"
                size="sm"
                className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[4rem] cursor-pointer"
                onClick={() => dispatch(cancelDialog())}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                color="teal"
                size="sm"
                className="normal-case text-center flex flex-row gap-1 text-[0.6rem] w-[8rem] cursor-pointer"
              >
                <PaperClipIcon color="white" className="h-4 w-4" />
                Upload Works
              </Button>
              <Link href={"/chat"}>
                <Button
                  variant="filled"
                  size="sm"
                  className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[7rem]"
                >
                  Go To Message
                </Button>
              </Link>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
export default OrderOngoingCard;
