import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  completeDialog,
  ratingDialog,
} from "@/redux/features/offer/offerSlice";

export default function CompleteDialogOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const isCompleteDialog = useSelector(
    (state: RootState) => state.offer.completeDialog
  );

  return (
    <>
      <Dialog
        open={isCompleteDialog}
        handler={() => dispatch(completeDialog())}
      >
        <DialogBody divider className="grid place-items-center h-[15rem]">
          <div className="flex flex-col gap-1 justify-center items-center">
            <Typography color="black" variant="small">
              Are you satisfied with the work delivered by the musician?
            </Typography>
            <Typography color="black" variant="small">
              The money will be paid into his account
            </Typography>
          </div>
          <div className="flex flex-row justify-center gap-20">
            <Button
              variant="filled"
              className="bg-gray-400 text-black"
              onClick={() => dispatch(completeDialog())}
            >
              No
            </Button>
            <Button variant="gradient" onClick={() => dispatch(ratingDialog())}>
              Yes
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
