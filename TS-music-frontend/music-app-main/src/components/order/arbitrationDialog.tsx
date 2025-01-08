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
import { arbitrationDialog } from "@/redux/features/offer/offerSlice";

export default function ArbitrationDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isArbitrationDialog = useSelector(
    (state: RootState) => state.offer.arbitrationDialog
  );

  return (
    <>
      <Dialog
        open={isArbitrationDialog}
        handler={() => dispatch(arbitrationDialog())}
        size="sm"
      >
        <DialogBody divider className="grid h-[32rem]">
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="h6" className="underline">
              Problem Summary
            </Typography>
            <input
              type="text"
              className="border border-gray-400 text-black text-sm rounded-lg p-2.5"
            />
          </div>
          <div className="py-2 flex flex-col gap-2 justify-start">
            <Typography color="black" variant="h6" className="underline">
              Details
            </Typography>
            <Textarea className="!h-[18rem]" />
          </div>
          <Button
            variant="gradient"
            className="underline"
            color="blue"
            onClick={() => dispatch(arbitrationDialog())}
          >
            Submit
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}
