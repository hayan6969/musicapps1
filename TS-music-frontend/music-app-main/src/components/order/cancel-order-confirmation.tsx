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
  cancelDialog,
  arbitrationDialog,
} from "@/redux/features/offer/offerSlice";

export default function CancelOrderConfirmation() {
  const dispatch = useDispatch<AppDispatch>();
  const isCancelDialog = useSelector(
    (state: RootState) => state.offer.cancelDialog
  );

  return (
    <>
      <Dialog open={isCancelDialog} handler={() => dispatch(cancelDialog())}>
        <DialogBody divider className="grid place-items-center h-[15rem]">
          <Typography color="black" variant="small">
            Do you agree to cancel the order?
          </Typography>
          <div className="flex flex-row justify-center gap-20">
            <Button
              variant="filled"
              className="bg-gray-400 text-black"
              onClick={() => dispatch(cancelDialog())}
            >
              No
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => dispatch(arbitrationDialog())}
            >
              Yes
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
