import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { ratingDialog } from "@/redux/features/offer/offerSlice";
import { StarIcon } from "@heroicons/react/24/outline";

export default function RatingDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isRatingDialog = useSelector(
    (state: RootState) => state.offer.ratingDialog
  );

  return (
    <>
      <Dialog
        open={isRatingDialog}
        handler={() => dispatch(ratingDialog())}
        size="sm"
      >
        <DialogBody divider className="flex flex-col gap-4 h-[30rem]">
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="small">
              Please Evaluate the work
            </Typography>
            <div className="flex flex-row gap-2 ml-4">
              <StarIcon
                width={30}
                height={30}
                color="black"
                className="cursor-pointer hover:scale-125"
              />
              <StarIcon
                width={30}
                height={30}
                color="black"
                className="cursor-pointer hover:scale-125"
              />
              <StarIcon
                width={30}
                height={30}
                color="black"
                className="cursor-pointer hover:scale-125"
              />
              <StarIcon
                width={30}
                height={30}
                color="black"
                className="cursor-pointer hover:scale-125"
              />
              <StarIcon
                width={30}
                height={30}
                color="black"
                className="cursor-pointer hover:scale-125"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start">
            <Typography color="black" variant="small">
              Please briefly comment on the work
            </Typography>
            <Textarea className="!h-[8rem]" />
          </div>
          <Button variant="gradient" onClick={() => dispatch(ratingDialog())}>
            Submit
          </Button>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 justify-between items-center mx-20">
              <Typography color="black" variant="h6" className="font-bold">
                Leave a tip
              </Typography>
              <div className="flex flex-row justify-center items-center gap-2">
                <span className="text-black">US$</span>
                <input
                  type="text"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className="border border-gray-400 w-[5rem] max-w-[5rem] text-black text-sm rounded-lg p-2.5"
                />
              </div>
            </div>
            <div className="flex flex-row justify-end mr-10">
              <Button
                variant="gradient"
                className="w-[10rem]"
                onClick={() => dispatch(ratingDialog())}
              >
                Pay
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
