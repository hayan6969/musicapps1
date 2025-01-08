import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  ClockIcon,
  ArrowPathIcon,
  PaperClipIcon,
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  cancelDialog,
  completeDialog,
  revisionDialog,
} from "@/redux/features/offer/offerSlice";

function OrderUploadedWorks() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <div className="">
        <Card
          className={`relative grid min-h-[5rem] w-[20rem] overflow-hidden shadow-sm border-2 rounded-md`}
        >
          <CardBody className={`relative flex flex-col px-0 py-0`}>
            <div className="border-b-2 border-black/20 py-2 px-6 flex flex-row justify-between">
              <p className="text-[0.7rem] font-bold text-black">
                I Will compose a pop up music
              </p>
              <p className="text-[0.7rem] font-bold text-amber-700">
                Delivering
              </p>
            </div>
            <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
              <div className="flex flex-row justify-between">
                <p className="text-[0.9rem] font-bold text-black">US$2000</p>
                {/* <p className="text-[0.8rem] font-bold text-black">
                  Start Time
                  <span className="text-[0.7rem] ml-3">07/08/2024</span>
                </p> */}
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
            <div className="border-b-2 border-black/20 flex flex-col justify-start py-2 mx-6 gap-1">
              <div className="flex flex-col">
                <div className="flex flex-row gap-1">
                  <PaperClipIcon color="black" className="h-4 w-4" />
                  <p className="text-[0.6rem] font-bold text-black hover:underline cursor-pointer">
                    Hotel California.mp3
                  </p>
                </div>
                <div className="flex flex-row gap-1">
                  <PaperClipIcon color="black" className="h-4 w-4" />
                  <p className="text-[0.6rem] font-bold text-black hover:underline cursor-pointer">
                    Hotel California.doc
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-6 gap-3 py-4">
              <div className="flex flex-row justify-between items-center gap-1">
                <div className="flex flex-row gap-1">
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
                    size="sm"
                    className="normal-case text-center text-[0.6rem] w-[5rem] cursor-pointer"
                    onClick={() => dispatch(completeDialog())}
                  >
                    Complete
                  </Button>
                </div>
                <Button
                  variant="filled"
                  size="sm"
                  className="normal-case text-center text-[0.6rem] w-[6rem] px-1 py-2"
                  onClick={() => dispatch(revisionDialog())}
                >
                  Need Revision
                </Button>
              </div>
              <div className="flex flex-row justify-between items-center gap-1">
                <p className="text-black text-[0.5rem] font-bold underline">
                  Submit to arbitration
                </p>
                <Button
                  variant="filled"
                  size="sm"
                  className="normal-case bg-gray-400 text-black text-center text-[0.6rem] w-[6rem] px-1 py-2"
                >
                  Go To Message
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
export default OrderUploadedWorks;
